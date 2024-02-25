import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async getUserByEmail(email: string) {
        let result = await this.prisma.user.findUnique({
            where: {
                email: email,
                username: 'ab'
            }
        });
        return result;
    }

    async getUserByUsername(username: string) {
        let result = await this.prisma.user.findUnique({
            where: {
                username: username
            }
        });
        return result;
    }

    async getUserByEmailOrUsername(username: string, email: string) {
        let result = await this.prisma.user.findFirst({
            where: {OR: [{username},{email}]}
        })
        return result;
    }

    async createUser(user: Prisma.userCreateInput) {
        let result = await this.prisma.user.create({
            data: user
        });
        return result;
    }

    async deleteUser(email: string, username: string) {
        await this.prisma.user.delete({
            where: {
                email: email,
                username: username
            }
        });
    }

    async updateListRefreshToken(username: string, refreshToken: string) {
        await this.prisma.user.update({
            data: {
                refreshToken: {
                    push: refreshToken
                } 
            },
            where: {
                username: username
            }
        });
    }

    async activateUser(username: string, refreshToken: string) {
        await this.prisma.user.update({
            data: {
                isActive: true,
                refreshToken: {
                    push: refreshToken
                }
            },
            where: {
                username: username
            }
        })
    }

    async updatePasswordByUsername(username: string, password: string, refreshToken: string) {
        await this.prisma.user.update({
            data: {
                password: password,
                refreshToken: [refreshToken]
            },
            where: {
                username: username
            }
        })
    }

    async clearRefreshToken(username: string, inputRefreshToken: string) {
        const { refreshToken } = await this.prisma.user.findUnique({
            where: {
                username: username
            },
            select: {
                refreshToken: true
            }
        });

        await this.prisma.user.update({
            where: {
                username: username
            },
            data: {
                refreshToken: {
                    set: refreshToken.filter(token => token !== inputRefreshToken)
                }
            }
        })
    }
}
