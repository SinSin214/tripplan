import { Injectable } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SelectionService {
    constructor(private prisma: PrismaService) {}

    async getAllTags(): Promise<Tag[]> {
        const res = await this.prisma.tag.findMany();
        return res;
    }
}
