import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Notification {
  id: string;
  userId: string;
  weeklyNewsletter: boolean;
  accountSummary: boolean;
  websiteNotifications: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Export the Prisma model
export const NotificationModel = prisma.notification;
