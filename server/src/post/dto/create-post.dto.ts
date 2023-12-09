import { IsNotEmpty } from "class-validator"

export class CreatePostDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    author: string

    @IsNotEmpty()
    images: string[]

    @IsNotEmpty()
    created_at: Date
}