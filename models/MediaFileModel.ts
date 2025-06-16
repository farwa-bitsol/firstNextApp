import { PrismaClient, MediaFile as PrismaMediaFile } from '@prisma/client';

const prisma = new PrismaClient();

export type MediaFile = PrismaMediaFile;

// Export the Prisma model
export const MediaFileModel = prisma.mediaFile;