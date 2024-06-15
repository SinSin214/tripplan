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
    email: string
}

export class SignInUserDto {
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    username: string

    @IsNotEmpty()
    password: string
}

export class SignOutUserDto {
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    username: string
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

    @IsNotEmpty()
    @MinLength(6)
    displayName: string
}