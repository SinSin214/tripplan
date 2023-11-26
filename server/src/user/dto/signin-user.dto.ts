import { Transform } from 'class-transformer';
import { MinLength, IsNotEmpty } from 'class-validator';
export class SignInUserDto {
    @IsNotEmpty()
    @MinLength(8)
    @Transform(({ value }) => value.toLowerCase())
    username: string

    @IsNotEmpty()
    @MinLength(8)
    password: string
}