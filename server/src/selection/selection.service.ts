import { Injectable } from '@nestjs/common';
import { Country, Tag } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SelectionService {
    constructor(private prisma: PrismaService) {}

    async getAllTags(): Promise<Tag[]> {
        const res = await this.prisma.tag.findMany();
        return res;
    }

    async getAllCountries(): Promise<Country[]> {
        const res = await this.prisma.country.findMany();
        return res;
    }
}
