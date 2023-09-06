import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    title: string

    @ApiProperty()
    description: string

    @ApiProperty()
    content: string

    @ApiProperty()
    highlights: string[]

    @ApiProperty()
    images: string[]

    @ApiProperty()
    main_image: string
}