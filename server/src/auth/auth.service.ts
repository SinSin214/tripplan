import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpUserDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async getUserByEmail(email: string): Promise<User> {
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

    async getUserByUsernameOrEmail(username: string, email: string): Promise<User> {
        const result = await this.prisma.user.findFirst({
            where: {
                OR: [
                    {
                        username: username
                    },
                    {
                        email: email
                    }
                ]
            }
        })
        return result;
    }

    async createUser(user: SignUpUserDto): Promise<void> {
        await this.prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                displayName: user.displayName,
                password: user.password
            }
        });
    }

    async deleteUser(email: string, username: string) {
        await this.prisma.user.delete({
            where: {
                email: email,
                username: username
            }
        });
    }

    async activateUser(username: string): Promise<void> {
        await this.prisma.user.update({
            data: {
                isActive: true
            },
            where: {
                username: username
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
