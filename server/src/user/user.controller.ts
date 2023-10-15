import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User as UserModel } from 'prisma/prisma-client';
import * as jwt from 'jsonwebtoken';
import { Response } from 'express';
import { SignInUserDto } from './dto/signin-user.dto';
import * as utils from '../utilities/authentication-utils';

interface JwtPayloadExtend {
    email: string,
    username: string
};


@Controller('auth')
export class UserController {
    accessTokenExpire: number;
    refreshTokenExpire: number;
    constructor(private userService: UserService) {
        this.accessTokenExpire = 86400;
        this.refreshTokenExpire = 864000;
    };

    @Post('signUp')
    async signUp(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        const { email, username, password } = createUserDto;
        try {
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
            let activateToken = jwt.sign({ email: email, username: username }, process.env.SECRECT_GENERATE_ACTIVATE_USER_TOKEN);
            await utils.sendActiveEmail(createUser, activateToken);
            res.status(200).send({
                message: 'A verification mail has been sent to your email. Please check'
            });
        }
        catch (err) {
            this.userService.deleteUserByEmail(email);
            res.status(500).send({
                error: err.message
            });
        }
    }

    @Post('signIn')
    async signIn(@Body() signInUserDto: SignInUserDto, @Res() res: Response) {
        try {
            const { username, password } = signInUserDto;
            let user = await this.userService.getUserByUsername(username);
            if(!user) throw new Error('Username does not exist');
            let matched = await bcrypt.compare(password, user.password);
            if (!matched) throw new Error('Incorrect password');
            if (!user.is_active) throw new Error('Inactive user');

            let accessToken = jwt.sign({ username: username, email: user.email }, process.env.SECRECT_GENERATE_ACCESS_TOKEN, {
                expiresIn: this.accessTokenExpire
            });
            let refreshToken = jwt.sign({ username: username, email: user.email }, process.env.SECRECT_GENERATE_REFRESH_TOKEN, {
                expiresIn: this.refreshTokenExpire
            });

            await this.userService.updateRefreshToken(username, refreshToken);
            return res.status(200).send({
                username: username,
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        }
        catch (err) {
            return res.status(500).send({
                error: err.message
            });
        }
    }

    @Get('activate/:activateToken')
    async activeUser(@Param('activateToken') activateToken: string, @Res() res: Response) {
        try {
            let decoded = jwt.verify(activateToken, process.env.SECRECT_GENERATE_ACTIVATE_USER_TOKEN) as JwtPayloadExtend;
            if (decoded && decoded.email) {
                this.userService.activateUser(decoded.email);
                let refreshToken = jwt.sign({ username: decoded.username, email: decoded.email }, process.env.SECRECT_GENERATE_REFRESH_TOKEN, {
                    expiresIn: this.refreshTokenExpire 
                });
                this.userService.updateRefreshToken(decoded.username, refreshToken);
            }
            else throw new Error('Invalid token');
            res.status(200).send({
                success: true
            });
        } catch (err) {
            res.status(500).send({
                error: err.message
            })
        }
    }
}
