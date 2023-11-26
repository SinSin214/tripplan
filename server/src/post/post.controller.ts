import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { Response } from 'express';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) {}

    @Get('all')
    async getAll() {
      return await this.postService.getAll();
    }

    @Get('highlights')
    async getHighlights(@Res() res: Response) {
        let result = await this.postService.getHighlights();
        setTimeout(async () => {
            return res.status(200).send({
                data: []
            });
        }, 3000)
    }

    // always put at bottom
    @Get(':id')
    async getDetail(@Param('id') id: string) {
        return await this.postService.getDetail(id);
    }

    @Post('')
    async createPost(@Body() post: CreatePostDto, @Res() res: Response) {
        try{
            let result = await this.postService.createPost(post);
            return res.status(200).send({
                message: 'Created post',
                success: true
            });
        } catch(err) {
            return res.status(500).send({
                message: err.message
            })
        }
    }
}

