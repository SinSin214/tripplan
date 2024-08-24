import { Injectable } from '@nestjs/common';
import { Prisma, Thread } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

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

    async getDetail(id: string): Promise<any> {
        const result = await this.prisma.thread.findUnique({
            include: {
                creator: {
                    select: {
                        displayName: true,
                        avatarFileName: true
                    }
                },
                tags: {
                    select: {
                        tagId: true
                    }
                }
            },
            
            where: {
                id: id
            }
        });

        return result;
    }

    async createThread(thread: Prisma.ThreadUncheckedCreateInput, username: string): Promise<Thread> {
        return await this.prisma.thread.create({
            data: {
                title: thread.title,
                description: thread.description,
                content: thread.content,
                images: thread.images,
                country: {
                    connect: {
                        id: thread.countryId
                    }
                },
                creator: {
                    connect: {
                        username: username
                    }
                },
            }
        });
    }

    async getHighlights(): Promise<Thread[]> {
        return await this.prisma.thread.findMany({
            take: 3
        });
    }
}
