import { PrismaClient } from '@prisma/client';
import { sql } from '@vercel/postgres';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prismaClient = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaClient

export async function connect() {
    try {
        // Test the connection
        await sql`SELECT 1`;
        await prismaClient.$connect();
        console.log('PostgreSQL connected successfully');
    } catch (error) {
        console.log('PostgreSQL connection error. Please make sure PostgreSQL is running.');
        console.log(error);
        process.exit(1);
    }
}

export { prismaClient as prisma, sql };
