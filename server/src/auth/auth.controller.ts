import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto, SignInUserDto, ForgotPasswordDto, ChangePasswordDto, SignOutUserDto, CheckTokenDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { User as UserModel } from 'prisma/prisma-client';
import * as jwt from 'jsonwebtoken';
import { Response } from 'express';
import * as utils from '../utilities/authentication-utils';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { };

    @Post('signUp')
    async signUp(@Body() signUpUserDto: SignUpUserDto, @Res() res: Response) {
        let errorDetails = [];
        try {
            const { username, password, email } = signUpUserDto;
            let hasError = false;
            let user = await this.authService.getUserByEmailOrUsername(username, email);

            if (user) {
                if (user.username === username) {
                    errorDetails.push({
                        field: 'username',
                        message: 'Username already existed'
                    })
                    hasError = true;
                }
                if (user.email === email) {
                    errorDetails.push({
                        field: 'email',
                        message: 'Email already existed'
                    })
                    hasError = true;
                }
            }

            if (hasError) throw new Error('Create user failed');

            let hashedPassword = await bcrypt.hash(password, 10);
            let createUser: UserModel = {
                username: username,
                password: hashedPassword,
                email: email,
                createdAt: new Date(),
                isActive: false,
                refreshToken: []
            }
            await this.authService.createUser(createUser);

            let activateToken = utils.generateActivateToken(username, email);
            await utils.sendActiveEmail(createUser, activateToken);

            return res.status(200).send({
                message: 'A verification mail has been sent to your email. Please check.'
            });
        } catch (err) {
            return res.status(500).send({
                message: err.message,
                detail: errorDetails
            });
        }
    }

    @Post('signIn')
    async signIn(@Body() body: SignInUserDto, @Res() res: Response) {
        let errorDetails = [];
        try {
            const { username, password } = body;

            const user = await this.authService.getUserByUsername(username);
            if (!user) {
                errorDetails.push({
                    field: 'username',
                    message: 'Username does not exist'
                })
                throw new Error('Username does not exist');
            }

            let matched = await bcrypt.compare(password, user.password);
            if (!matched) {
                errorDetails.push({
                    field: 'password',
                    message: 'Incorrect password'
                })
                throw new Error('Incorrect password');
            }

            if (!user.isActive) throw new Error('User has not been activated.');

            let accessToken = utils.generateAccessToken(user.username, user.email);
            let refreshToken = utils.generateRefreshToken(user.username, user.email);
            await this.authService.updateListRefreshToken(user.username, refreshToken);

            return res.status(200).send({
                user: {
                    username: user.username,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    email: user.email
                },
                message: 'Login successfully'
            });
        } catch (err) {
            return res.status(500).send({
                message: err.message,
                detail: errorDetails
            });
        }
    }

    @Get('activate/:activateToken')
    async activeUser(@Param('activateToken') activateToken: string, @Res() res: Response) {
        try {
            const decoded: any = jwt.verify(activateToken, process.env.SECRECT_ACTIVATE_USER_TOKEN);
            const { username, email } = decoded;

            let refreshToken = utils.generateRefreshToken(username, email);
            let accessToken = utils.generateAccessToken(username, email);
            await this.authService.activateUser(username, refreshToken);

            return res.status(200).send({
                message: 'Activate account successfully.',
                user: {
                    username: username,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    email: email
                }
            });
        } catch (err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }

    @Post('forgotPassword')
    async forgotPassword(@Body() body: ForgotPasswordDto, @Res() res: Response) {
        try {
            const { username } = body;

            const user = await this.authService.getUserByUsername(username);
            if (!user) throw Error('Username does not exist');

            let token = utils.generateChangePasswordToken(user.username, user.email);
            await utils.sendEmailChangePassword(user.email, token);

            return res.status(200).send({
                message: 'An email to recovery your password has been sent to registered email of this account.',
                success: true
            })
        } catch (err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }

    @Post('changePassword/:token')
    async changePassword(@Body() body: ChangePasswordDto, @Param('token') token: string, @Res() res: Response) {
        try {
            const decoded: any = jwt.verify(token, process.env.SECRECT_CHANGE_PASSWORD_TOKEN);

            const { username, email } = decoded;
            const { password } = body;

            let hashedPassword = await bcrypt.hash(password, 10);
            let refreshToken = utils.generateRefreshToken(username, email);
            await this.authService.updatePasswordByUsername(username, hashedPassword, refreshToken);

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

    @Post('signOut')
    async signOut(@Body() body: SignOutUserDto, @Res() res: Response) {
        try {
            const { username, refreshToken } = body;
            await this.authService.clearRefreshToken(username, refreshToken);

            return res.status(200).send({
                message: 'You have been signed out.'
            });
        } catch (err) {
            return res.status(500).send({
                message: err.message
            });
        }
    }

    @Post('check_token_expiration')
    async checkTokenExpiration(@Body() body: CheckTokenDto, @Res() res: Response) {
        const { accessToken, refreshToken } = body;
        jwt.verify(accessToken, process.env.SECRECT_ACCESS_TOKEN, function (errAccessToken, decodedAccessToken) {
            if (errAccessToken) {
                if (errAccessToken.name === 'TokenExpiredError') {
                    jwt.verify(refreshToken, process.env.SECRECT_REFRESH_TOKEN, function (errRefreshToken, decodedRefreshToken) {
                        // If both access and refresh token expored
                        if (errRefreshToken && errRefreshToken.name === 'TokenExpiredError') {
                            throw Error('Token is expired, please login again');
                        } else {    // If only access token expired
                            let newAccessToken = utils.generateRefreshToken(decodedRefreshToken['username'], decodedRefreshToken['email']);
                            return res.status(200).send({
                                user: {
                                    username: decodedRefreshToken['username'],
                                    email: decodedRefreshToken['email'],
                                    accessToken: newAccessToken,
                                    refreshToken: refreshToken
                                }
                            })
                        }
                    })
                } else {
                    return res.status(500).send({
                        message: errAccessToken.name
                    })
                }
            } else {    // If access token not expired, use old userInfo
                return res.status(200).send({
                    user: body
                });
            }
        });
    }
}
