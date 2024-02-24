import { Injectable } from '@nestjs/common';
import { thread } from '@prisma/client';
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
                modifiedAt: true,
                createdAt: true,
                description: true
            }
        });
        return res;
    }

    async getDetail(id: string): Promise<thread> {
        return await this.prisma.thread.findUnique({
            where: {
                id: id
            }
        });
    }

    async createThread(thread: CreateThreadDto): Promise<any> {
        return await this.prisma.thread.create({data: thread});
    }

    async getHighlights() {
        return await this.prisma.thread.findMany({
            take: 10
        });
    }
}
