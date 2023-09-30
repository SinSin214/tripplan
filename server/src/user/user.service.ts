import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {};
    
    async getEmail(email: string): Promise<{email: string}[]> {
        return await this.prisma.user.findMany({
            select: {
                email: true
            },
            where: {
                email: email
            }
        });
    }

    async getUsername(username: string): Promise<{username: string}[]> {
        return await this.prisma.user.findMany({
            select: {
                username: true
            },
            where: {
                username: username
            }
        });
    }
}
