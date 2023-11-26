import { IsEmail, MinLength, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

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