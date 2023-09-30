import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt from "bcrypt";
import { User as UserModel } from 'prisma/prisma-client';
import jwt from 'jsonwebtoken';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {};

    @Post('signUp')
    async signUp(@Body() user: CreateUserDto) {
        const { email, username, password } = user;

        // Check username and email existed
        let usernameExisted = await this.checkUsernameExist(username);
        if(usernameExisted) throw new Error('Username existed');
        let emailExisted = await this.checkEmailExist(email);
        if(emailExisted) throw new Error('Email existed');
        
        let hashedPassword = await bcrypt.hash(password, 10);
        let refreshToken = jwt.sign(user, process.env.SECRECT_KEY_GENERATE_TOKEN, {
            expiresIn: 86400 // 1 day

        });

        let createUser: UserModel = {
            id: null,
            username: username,
            password: hashedPassword,
            email: email,
            created_at: null,
            is_active: false,
            refresh_token: refreshToken
        }
        await this.userService.createUser(createUser);

        const token = jwt.sign(user, process.env.SECRECT_GENERATE_TOKEN, {
            expiresIn: 3600 // 1 hour
        });

        
    }

    async checkEmailExist(email: string) {
        let res = await this.userService.getEmail(email);
        return res.length > 0; 
    }

    async checkUsernameExist(username: string) {
        let res = await this.userService.getUsername(username);
        return res.length > 0; 
    }
}
