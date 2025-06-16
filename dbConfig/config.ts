import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prismaClient = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaClient

export async function connect() {
    try {
        await prismaClient.$connect();
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Database connection error. Please make sure your database is running.');
        console.log(error);
        process.exit(1);
    }
}

export { prismaClient as prisma };
