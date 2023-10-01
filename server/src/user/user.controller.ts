import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt from "bcrypt";
import { User as UserModel } from 'prisma/prisma-client';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { SignInUserDto } from './dto/signin-user.dto';
import * as utils from '../utilities/authentication-utils';

interface JwtPayloadExtend {
    email: string
}

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { };

    @Post('signUp')
    async signUp(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
        try {
            const { email, username, password, display_name } = createUserDto;
            let user = await this.userService.getUserByEmailOrUsername(username, email);
            if (user && user.username === username) throw new Error('Username existed');
            if (user && user.email === email) throw new Error('Email existed');
            let hashedPassword = await bcrypt.hash(password, 10);
            let activateToken = jwt.sign({ email: email }, process.env.SECRECT_GENERATE_ACTIVATE_USER_TOKEN);
            let createUser: UserModel = {
                username: username,
                password: hashedPassword,
                email: email,
                display_name: display_name,
                created_at: null,
                is_active: false,
                refresh_token: null
            }
            await this.userService.createUser(createUser);
            await utils.sendActiveEmail(createUser, activateToken);
            res.status(200).send({
                message: 'A verification mail has been sent to your email. Please check'
            });
        }
        catch (err) {
            throw new Error(err);
        }
    }

    @Post('signIn')
    async signIn(@Body() signInUserDto: SignInUserDto, @Res() res: Response) {
        try {
            const { username, password } = signInUserDto;
            let user = await this.userService.getUserByUsername(username);
            let matched = await bcrypt.compare(password, user.password);
            if (!matched) throw new Error('Incorrect password');
            if (!user.is_active) throw new Error('Inactive user');

            let accessToken = jwt.sign({ username: username, password: password }, process.env.SECRECT_GENERATE_ACCESS_TOKEN, {
                expiresIn: 86400 // 1 day
            });
            let refreshToken = jwt.sign({ username: username, password: password }, process.env.SECRECT_GENERATE_REFRESH_TOKEN, {
                expiresIn: 864000 // 10 days
            });

            let result = await this.userService.updateRefreshToken(username, refreshToken);
            res.status(200).send({
                username: username,
                displayName: result.display_name,
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        }
        catch (err) {
            throw new Error(err);
        }
    }

    @Get('active/:activateToken')
    async activeUser(@Param('activateToken') activateToken: string, @Res() res: Response) {
        try {
            let decoded = jwt.verify(activateToken, process.env.SECRECT_GENERATE_ACTIVATE_USER_TOKEN) as JwtPayloadExtend;
            if (decoded && decoded.email) this.userService.activateUser(decoded.email);
            else throw new Error('Invalid informations');
            res.status(200);
        } catch (err) {
            throw new Error(err);
        }
    }
}
