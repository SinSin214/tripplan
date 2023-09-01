import { Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) {}

    @Get('/getAll')
    async getAll() {
      return await this.postService.getAll();
    }

    @Get('/getDetail/:id')
    async getDetail(@Param('id') id: string) {
        return await this.postService.getDetail(id);
    }
}

