import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) {}

    @Get('all')
    async getAll() {
      return await this.postService.getAll();
    }

    @Get(':id')
    async getDetail(@Param('id') id: string) {
        return await this.postService.getDetail(id);
    }

    @Post('')
    async createPost(@Body() post: CreatePostDto) {
        return await this.postService.createPost(post);
    }
}

