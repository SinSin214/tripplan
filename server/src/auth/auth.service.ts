import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpUserDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async getUserByEmail(email: string) {
        const result = await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });
        return result;
    }

    async getUserByUsername(username: string) {
        const result = await this.prisma.user.findUnique({
            where: {
                username: username
            }
        });
        return result;
    }

    async createUser(user: SignUpUserDto) {
        const result = await this.prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                displayName: user.displayName,
                password: user.password
            }
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

    async updateRefreshToken(username: string, refreshToken: string) {
        await this.prisma.user.update({
            data: {
                refreshToken: refreshToken
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
                refreshToken: refreshToken
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
                refreshToken: refreshToken
            },
            where: {
                username: username
            }
        })
    }

    async clearRefreshToken(username: string) {
        await this.prisma.user.update({
            where: {
                username: username
            },
            data: {
                refreshToken: null
            }
        })
    }
}
