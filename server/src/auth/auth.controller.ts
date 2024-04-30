import { Body, Controller, Get, Param, Post, Res, Headers, Req, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto, SignInUserDto, ForgotPasswordDto, ChangePasswordDto, SignOutUserDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as utils from '../utilities/authentication';
import { WrapAsyncInterceptor } from 'src/middlewares/wrapAsync.interceptor';

@UseInterceptors(new WrapAsyncInterceptor())
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { };

    @Post('sign_up')
    async signUp(@Headers('origin') origin: string, @Body() signUpUser: SignUpUserDto) {
        const { username, password, email } = signUpUser;
        if (await this.authService.getUserByUsername(username)) {
            throw new Error('UsernameExisted');
        } else if (await this.authService.getUserByEmail(email)) {
            throw new Error('EmailExisted');
        }

        signUpUser.password = await bcrypt.hash(password, 10);
        await this.authService.createUser(signUpUser);

        const activateToken = utils.generateActivateToken(username, email);
        await utils.sendActiveEmail(origin, signUpUser.email, activateToken);

        return {
            messageCode: 'VerificationEmailSent'
        };
    }

    @Post('sign_in')
    async signIn(@Body() signInUser: SignInUserDto) {
        const { username, password } = signInUser;

        const user = await this.authService.getUserByUsername(username);
        if (!user) throw new Error('UserNotExist');

        const matched = await bcrypt.compare(password, user.password);
        if (!matched) throw new Error('IncorrectPassword');
        if (!user.isActive) throw new Error('UserInactived');

        const accessToken = utils.generateAccessToken(user.username, user.email);
        const refreshToken = utils.generateRefreshToken(user.username, user.email);
        await this.authService.updateRefreshToken(user.username, refreshToken);

        return {
            data: {
                username: user.username,
                accessToken: accessToken,
                refreshToken: refreshToken,
                email: user.email,
            },
            messageCode: 'LoginSuccessfully'
        };
    }

    @Get('activate/:activateToken')
    async activeUser(@Param('activateToken') activateToken: string) {
        const decoded: any = jwt.verify(activateToken, process.env.SECRECT_ACTIVATE_USER_TOKEN);
        const { username, email } = decoded;

        const refreshToken = utils.generateRefreshToken(username, email);
        const accessToken = utils.generateAccessToken(username, email);
        await this.authService.activateUser(username, refreshToken);

        return {
            messageCode: 'ActivedAccount',
            data: {
                username: username,
                accessToken: accessToken,
                refreshToken: refreshToken,
                email: email
            }
        };
    }

    @Post('forgot_password')
    async forgotPassword(@Body() forgotPassword: ForgotPasswordDto) {
        const { username } = forgotPassword;

        const user = await this.authService.getUserByUsername(username);
        if (!user) throw Error('UserNotExist');

        const token = utils.generateChangePasswordToken(user.username, user.email);
        await utils.sendEmailChangePassword(user.email, token);

        return {
            messageCode: 'RecoveryEmailSent'
        };
    }

    @Post('change_password/:changePasswordToken')
    async changePassword(@Body() changePassword: ChangePasswordDto, @Param('changePasswordToken') token: string) {
        const decoded: any = jwt.verify(token, process.env.SECRECT_CHANGE_PASSWORD_TOKEN);
        const { username, email } = decoded;
        const { password } = changePassword;
        const hashedPassword = await bcrypt.hash(password, 10);
        const refreshToken = utils.generateRefreshToken(username, email);
        await this.authService.updatePasswordByUsername(username, hashedPassword, refreshToken);

        return {
            messageCode: 'UpdatedPassword'
        }
    }

    @Post('sign_out')
    async signOut(@Body() signOutUser: SignOutUserDto) {
        const { username } = signOutUser;
        await this.authService.clearRefreshToken(username);
        return {
            messageCode: 'SignOutSuccessfully'
        };
    }

    @Post('new_access_token')
    async checkTokenExpiration(@Body('refreshToken') refreshToken: string) {
        if(!refreshToken) throw new Error('RefreshTokenExpired');

        let userInfo = {};
        jwt.verify(refreshToken, process.env.SECRECT_REFRESH_TOKEN, (errRefreshToken, decodedRefreshToken) => {
            if (errRefreshToken) throw new Error('RefreshTokenExpired');

            const { username, email } = decodedRefreshToken as { username: string, email: string };
            userInfo = {
                username: username,
                email: email,
                accessToken: utils.generateAccessToken(username, email),
                refreshToken: refreshToken
            }
        })
        return {
            data: userInfo
        };
    }
}
