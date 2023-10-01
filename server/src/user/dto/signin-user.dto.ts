import { MinLength } from 'class-validator';
export class SignInUserDto {
    @MinLength(10)
    username: string

    @MinLength(10)
    password: string
}