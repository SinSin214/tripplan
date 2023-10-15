import { IsEmail, MinLength, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
    @MinLength(10)
    username: string

    @MinLength(10)
    password: string

    @IsEmail()
    email: string
}