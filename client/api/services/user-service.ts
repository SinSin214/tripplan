import { PrismaClient, user } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllUsernameAndEmail() {
    let user = await prisma.user.findMany({
        select: {
            email: true,
            username: true
        }
    });
    return user;
}

export async function createUser(username: string, email: string, password: string) {
    let newUser = await prisma.user.create({
        data: {
            username: username,
            email: email,
            password: password,
        },
    })
    return newUser;
}

export async function getUserByEmail(email: string) {
    let user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    return user;
}

export async function activeUser(userId: string) {
    await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          is_active: true,
        },
      })
}