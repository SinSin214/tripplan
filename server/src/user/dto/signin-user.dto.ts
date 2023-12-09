import { Transform } from 'class-transformer';
export class SignInUserDto {
    @Transform(({ value }) => value.toLowerCase())
    username: string

    password: string
}