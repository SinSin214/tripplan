import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateThreadDto } from './thread.dto';

@Injectable()
export class ThreadService {
    constructor(private prisma: PrismaService) {}

    async getThreadAll() {
        const res = await this.prisma.thread.findMany({
            select: {
                id: true,
                title: true,
                creator: true,
                createdAt: true,
                description: true
            }
        });
        return res;
    }

    async getDetail(id: string) {
        return await this.prisma.thread.findUnique({
            where: {
                id: id
            },
            include: {
                creator: {
                    select: {
                        displayName: true
                    }
                }
            }
        });
    }

    async createThread(thread: any, username: string): Promise<any> {
        return await this.prisma.thread.create({
            data: {
                title: thread.title,
                description: thread.description,
                content: thread.content,
                countryId: thread.countryId,
                creatorUsername: username
            }
        });
    }

    async getHighlights() {
        return await this.prisma.thread.findMany({
            take: 10
        });
    }
}
