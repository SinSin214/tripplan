import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) {}

    async getAll(): Promise<Post[]> {
        let result = await this.prisma.post.findMany();
        return result;
    }

    async getDetail(id: string): Promise<Object> {
        let result = await this.prisma.post.findUnique({
            where: {
                id: id
            }
        });
        return result;
    }

    async createPost(post: CreatePostDto): Promise<any> {
        await this.prisma.post.create({data: post});
        return ;
    }
}
