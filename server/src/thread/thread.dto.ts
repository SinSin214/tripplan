import { IsNotEmpty } from "class-validator"

export class CreateThreadDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    creator: string

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
}

export class ThreadDetailDto {
    id: string

    title: string

    description: string

    content: string

    // highlights: string[]

    // images: string[]

    blocks: any
}