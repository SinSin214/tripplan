import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) {}

    async getAll(): Promise<Post[]> {
        return await this.prisma.post.findMany();
    }

    async getDetail(id: string): Promise<Object> {
        return await this.prisma.post.findUnique({
            where: {
                id: id
            }
        });
    }

    async createPost(post: CreatePostDto): Promise<any> {
        return await this.prisma.post.create({data: post});
    }

    async getHighlights() {
        return await this.prisma.post.findMany({
            take: 10
        });
    }
}
