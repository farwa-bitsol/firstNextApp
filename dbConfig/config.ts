import { PrismaClient } from '@prisma/client';
import { sql } from '@vercel/postgres';

const prisma = new PrismaClient();

export async function connect() {
    try {
        // Test the connection
        await sql`SELECT 1`;
        await prisma.$connect();
        console.log('PostgreSQL connected successfully');
    } catch (error) {
        console.log('PostgreSQL connection error. Please make sure PostgreSQL is running.');
        console.log(error);
        process.exit(1);
    }
}

export { prisma, sql };
