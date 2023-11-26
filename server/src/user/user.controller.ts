import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpUserDto } from './dto/signup-user.dto';
import * as bcrypt from 'bcrypt';
import { User as UserModel } from 'prisma/prisma-client';
import * as jwt from 'jsonwebtoken';
import { Response } from 'express';
import { SignInUserDto } from './dto/signin-user.dto';
import * as utils from '../utilities/authentication-utils';

@Controller('auth')
export class UserController {
    accessTokenExpire: number;
    refreshTokenExpire: number;
    constructor(private userService: UserService) {
        this.accessTokenExpire = 86400;
        this.refreshTokenExpire = 864000;
    };

    @Post('signUp')
    async signUp(@Body() signUpUserDto: SignUpUserDto, @Res() res: Response) {
        try {
            const { username, password, email} = signUpUserDto;

            let user = await this.userService.getUserByEmailOrUsername(username, email);
            if (user && user.username === username) throw new Error('Username existed');
            if (user && user.email === email) throw new Error('Email existed');
            let hashedPassword = await bcrypt.hash(password, 10);
            let createUser: UserModel = {
                username: username,
                password: hashedPassword,
                email: email,
                created_at: new Date(),
                is_active: false,
                refresh_token: null
            }
            await this.userService.createUser(createUser);
            let activateToken = jwt.sign({ email: email, username: username }, process.env.SECRECT_ACTIVATE_USER_TOKEN,{
                expiresIn: this.accessTokenExpire
            });
            await utils.sendActiveEmail(createUser, activateToken);
            return res.status(200).send({
                message: 'A verification mail has been sent to your email. Please check'
            });
        } catch (err) {
            // this.userService.deleteUserByEmail(email);
            return res.status(500).send({
                message: err.message
            });
        }
    }

    @Post('signIn')
    async signIn(@Body() body: SignInUserDto, @Res() res: Response) {
        try {
            const { username, password } = body;
            let user = await this.userService.getUserByUsername(username);
            if(!user) throw new Error('Username does not exist');
            let matched = await bcrypt.compare(password, user.password);
            if (!matched) throw new Error('Incorrect password');
            if (!user.is_active) throw new Error('Inactive user');

            let accessToken = jwt.sign({ username: username, email: user.email }, process.env.SECRECT_ACCESS_TOKEN, {
                expiresIn: this.accessTokenExpire
            });
            let refreshToken = jwt.sign({ username: username, email: user.email }, process.env.SECRECT_REFRESH_TOKEN, {
                expiresIn: this.refreshTokenExpire
            });

            await this.userService.updateRefreshToken(username, refreshToken);
            return res.status(200).send({
                username: username,
                accessToken: accessToken,
                message: 'Login successfully'
            });
        } catch (err) {
            return res.status(500).send({
                message: err.message
            });
        }
    }

    @Get('activate/:activateToken')
    async activeUser(@Param('activateToken') activateToken: string, @Res() res: Response) {
        try {
            const decoded = jwt.verify(activateToken, process.env.SECRECT_ACTIVATE_USER_TOKEN);
            const username = decoded['username'];
            const email = decoded['email'];
            await this.userService.activateUser(email);
            let accessToken = jwt.sign({ username: username, email: email }, process.env.SECRECT_ACCESS_TOKEN, {
                expiresIn: this.accessTokenExpire
            });
            return res.status(200).send({
                message: 'Activate account successfully.',
                username: username,
                accessToken: accessToken
            });
        } catch (err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }

    @Post('forgotPassword')
    async forgotPassword(@Body() body: Object, @Res() res: Response) {
        try {
            const username = body['username'].toLowerCase();
            const user = await this.userService.getUserByUsername(username);
            if(!user) throw Error('Username does not exist');
            let changePasswordToken = jwt.sign({ username: user.username, email: user.email }, process.env.SECRECT_CHANGE_PASSWORD_TOKEN,{
                expiresIn: this.accessTokenExpire
            });
            await utils.sendEmailChangePassword(user.email, changePasswordToken);

            return res.status(200).send({
                message: 'An email to recovery your password has been sent to registered email of this account.',
                success: true
            })
        } catch(err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }

    @Post('changePassword/:token')
    async changePassword(@Body() body: Object, @Param('token') token: string, @Res() res: Response) {
        try {
            const decoded = jwt.verify(token, process.env.SECRECT_CHANGE_PASSWORD_TOKEN);
            const username = decoded['username'];
            const password = body['password'];
            const hashedPassword = await bcrypt.hash(password, 10);
            await this.userService.updatePasswordByUsername(username, hashedPassword);

            return res.status(200).send({
                message: 'Update password successfully.',
                success: true
            });
        } catch (err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }
}
