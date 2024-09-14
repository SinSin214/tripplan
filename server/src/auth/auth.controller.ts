import { Body, Controller, Get, Param, Post, Res, Headers, Req, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto, SignInUserDto, ForgotPasswordDto, ChangePasswordDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as utils from '../utilities/authentication';
import { WrapAsyncInterceptor } from 'src/middlewares/wrapAsync.interceptor';
import { Request, Response } from 'express';
import { avatarFileName } from 'src/utilities/constants';
import { ResponseStatus } from 'types/globalTypes';
import { addPathToImage } from 'src/utilities/imagePath';
import { throwCustomError } from 'src/utilities/helpers';

@UseInterceptors(new WrapAsyncInterceptor())
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { };

    @Post('sign_up')
    async signUp(@Headers('origin') origin: string, @Body() signUpUser: SignUpUserDto) {
        const { username, password, email } = signUpUser;
        const existedUser = await this.authService.getUserByUsernameOrEmail(username, email);
        if(username === existedUser.username || email === existedUser.email) {
            const errors = [];
            if(username === existedUser.username) {
                errors.push({
                    field: 'username',
                    messageCode: 'UsernameExisted'
                })
            }
            if(email === existedUser.email) {
                errors.push({
                    field: 'email',
                    messageCode: 'EmailExisted'
                })
            }
            throwCustomError({
                status: ResponseStatus.Fail,
                data: {
                    errors: errors
                }
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = {
            ...signUpUser,
            password: hashedPassword,
            avatarFileName: avatarFileName
        };

        await this.authService.createUser(newUser);

        const activateToken = utils.generateToken(username, email, process.env.SECRECT_ACTIVATE_USER_TOKEN);
        await utils.sendActiveEmail(origin, signUpUser.email, activateToken);
        return {
            messageCode: 'VerificationEmailSent'
        };
    }

    @Post('sign_in')
    async signIn(@Body() signInUser: SignInUserDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const { username, password } = signInUser; 
        const user = await this.authService.getUserProfileByUsername(username);
        if (!user) {
            throwCustomError({
                data: {
                    errors: [{
                        field: 'username',
                        messageCode: 'UsernameNotExist'
                    }]
                }
            });
        }

        const matched = await bcrypt.compare(password, user.password);
        if (!matched) {
            throwCustomError({
                status: ResponseStatus.Fail,
                data: {
                    errors: [{
                        field: 'password',
                        messageCode: 'IncorrectPassword'
                    }]
                }
            });
        } else if (!user.isActive) {
            throwCustomError({
                status: ResponseStatus.Fail,
                data: {
                    errors: [{
                        field: 'password',
                        messageCode: 'UserInactived'
                    }]
                }
            });
        }

        const encryptedData = utils.generateToken(user.username, user.email, process.env.SECRECT_SESSION_TOKEN);
        const userInfo = {
            username: user.username,
            email: user.email,
            displayName: user.displayName,
            avatarPath: addPathToImage(user.avatarFileName, process.env.AVATAR_FOLDER_NAME),
            bio: user.bio,
            roleId: user.roleId
        }
        res.cookie('session', encryptedData, {maxAge: 24 * 60 * 60 * 1000});   // 1 day life
        res.cookie('userInfo', JSON.stringify(userInfo), {maxAge: 24 * 60 * 60 * 1000})

        return {
            data: userInfo,
            messageCode: 'LoginSuccessfully'
        };
    }

    @Get('activate/:activateToken')
    async activeUser(@Param('activateToken') activateToken: string, @Res({ passthrough: true }) res: Response) {
        const decoded = jwt.verify(activateToken, process.env.SECRECT_ACTIVATE_USER_TOKEN) as any;
        const { username } = decoded;
        await this.authService.activateUser(username);
        return {
            messageCode: 'ActivedAccount'
        };
    }

    @Post('forgot_password')
    async forgotPassword(@Body() forgotPassword: ForgotPasswordDto) {
        const { email } = forgotPassword;
        const user = await this.authService.getUserByEmail(email);
        if (!user) {
            throwCustomError({
                status: ResponseStatus.Fail,
                data: {
                    errors: [{
                        field: 'email',
                        messageCode: 'EmailNotExist'
                    }]
                }
            });
        }

        const token = utils.generateToken(user.username, user.email, process.env.SECRECT_CHANGE_PASSWORD_TOKEN);
        await utils.sendEmailChangePassword(user.email, token);

        return {
            messageCode: 'RecoveryEmailSent'
        };
    }

    @Post('change_password/:changePasswordToken')
    async changePassword(@Body() changePassword: ChangePasswordDto, @Param('changePasswordToken') token: string) {
        const decoded: any = jwt.verify(token, process.env.SECRECT_CHANGE_PASSWORD_TOKEN);
        const { username } = decoded;
        const hashedPassword = await bcrypt.hash(changePassword.password, 10);
        await this.authService.updatePasswordByUsername(username, hashedPassword);

        return {
            messageCode: 'UpdatedPassword'
        }
    }

    @Get('sign_out')
    async signOut(@Res({ passthrough: true }) res: Response) {
        res.cookie("session", "", { maxAge: 0 });
        res.cookie("userInfo", "", { maxAge: 0 });

        return {
            messageCode: 'SignOutSuccessfully'
        };
    }
}
