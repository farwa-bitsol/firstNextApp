import { PrismaClient, Chat as PrismaChat, Message as PrismaMessage } from '@prisma/client';

const prisma = new PrismaClient();

export type Chat = PrismaChat;
export type Message = PrismaMessage;

// Export the Prisma model
export const ChatModel = prisma.chat;
