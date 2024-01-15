import { IsNotEmpty } from "class-validator"

export class CreateThreadDto {
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


export class UpdateThreadDto {
    id: string

    title: string

    description: string

    content: string

    highlights: string[]

    images: string[]

    main_image: string
}