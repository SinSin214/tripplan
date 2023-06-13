import * as helper from '../helpers/database';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAllUsernameAndEmail() {
    let queryString = `SELECT username, email FROM users`;

    return helper.queryDatabase(queryString);
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