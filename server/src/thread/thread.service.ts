import { Injectable } from '@nestjs/common';
import { Thread } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateThreadDto } from './thread.dto';

@Injectable()
export class ThreadService {
    constructor(private prisma: PrismaService) {}

    async getThreadAll(): Promise<Partial<Thread>[]> {
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

    async getDetail(id: string): Promise<Partial<Thread>> {
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

    async createThread(thread: any, username: string): Promise<Thread> {
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

    async getHighlights(): Promise<Thread[]> {
        return await this.prisma.thread.findMany({
            take: 10
        });
    }
}
