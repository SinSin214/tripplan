import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { Request, Response } from 'express';
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
        try {
            let result = await this.postService.getHighlights();
            setTimeout(async () => {
                return res.status(500).send({
                    data: []
                });
            }, 3000)
        } catch(err) {
            return res.status(500).send({
                message: err.message
            })
        }
        
    }

    // always put at bottom
    @Get(':id')
    async getDetail(@Param('id') id: string) {
        return await this.postService.getDetail(id);
    }

    @Post('')
    async createPost(@Req() req: Request, @Res() res: Response) {
        try {
            const post = req.body;
            const username = req.user['username'];
            let oPost: CreatePostDto = {
                ...post,
                author: username,
                created_at: new Date()
            }
            await this.postService.createPost(oPost);
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

