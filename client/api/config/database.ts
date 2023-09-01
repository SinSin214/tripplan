import { Pool } from 'pg';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
export let dbPool = new Pool();

export async function provideDbPool() {
    let dbConfig = {
        max: 50,
        connectionTimeoutMillis: 10000,
        connectionString: process.env.DATABASE_CONNECTION
    };
    
    dbPool = new Pool(dbConfig);
}
