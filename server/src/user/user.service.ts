import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getUserByEmail(email: string): Promise<User> {
        let result = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });
        return result;
    }

    async getUserByUsername(username: string): Promise<User> {
        let result = await this.prisma.user.findUnique({
            where: {
                username: username
            }
        });
        return result;
    }

    async getUserByEmailOrUsername(username: string, email: string): Promise<User> {
        let result = await this.prisma.user.findFirst({
            where: {OR: [{username},{email}]}
        })
        return result;
    }

    async createUser(user: User): Promise<User> {
        let result = await this.prisma.user.create({
            data: user
        });
        return result;
    }

    async deleteUserByEmail(email: string): Promise<void> {
        await this.prisma.user.delete({
            where: {
                email: email
            }
        }).catch();
    }

    async updateRefreshToken(username: string, refresh_token: string): Promise<void> {
        await this.prisma.user.update({
            data: {
                refresh_token: refresh_token
            },
            where: {
                username: username
            }
        });
    }

    async activateUser(email: string): Promise<void> {
        await this.prisma.user.update({
            data: {
                is_active: true
            },
            where: {
                email: email
            }
        })
    }

    async updatePasswordByUsername(username: string, password: string): Promise<void> {
        await this.prisma.user.update({
            data: {
                password: password
            },
            where: {
                username: username
            }
        })
    }
}
