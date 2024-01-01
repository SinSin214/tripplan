import { IsNotEmpty, Equals, IsEmail, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class ChangePasswordDto {
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @Equals('password')
    confirmPassword: string;
}

export class ForgotPasswordDto {
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    username: string
}

export class SignInUserDto {
    @Transform(({ value }) => value.toLowerCase())
    username: string

    password: string
}

export class SignOutUserDto {
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    username: string

    @IsNotEmpty()
    refreshToken: string
}

export class SignUpUserDto {
    @IsNotEmpty()
    @MinLength(8)
    @Transform(({ value }) => value.toLowerCase())
    username: string

    @IsNotEmpty()
    @MinLength(8)
    password: string

    @IsNotEmpty()
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    email: string
}

export class CheckTokenDto {
    username: string
    email: string
    accessToken: string
    refreshToken: string
}