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
    createdAt: Date
}


export class UpdatePostDto {
    id: string

    title: string

    description: string

    content: string

    highlights: string[]

    images: string[]

    main_image: string
}