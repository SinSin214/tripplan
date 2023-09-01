import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) {}

    async getAll(): Promise<any[]> {
        let result = this.prisma.user.findMany({
            
        });
        return result;
    }

    async getDetail(id: string): Promise<Object> {
        let result = this.prisma.post.findUnique({
            include: {
                images: true
            },
            where: {
                id: id
            }
        });
        return result;
    }
}
