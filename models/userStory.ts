import { PrismaClient, UserStory as PrismaUserStory, Story as PrismaStory } from '@prisma/client';

const prisma = new PrismaClient();

export type UserStory = PrismaUserStory;
export type Story = PrismaStory;

// Export the Prisma model
export const UserStoryModel = prisma.userStory;
