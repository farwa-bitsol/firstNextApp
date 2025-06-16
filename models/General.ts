import { PrismaClient, GeneralForm as PrismaGeneralForm } from '@prisma/client';

const prisma = new PrismaClient();

export type GeneralForm = PrismaGeneralForm;

export interface OnlinePresence {
  id: string;
  url: string;
}

export interface GeneralProfile {
  name: string;
  data: string;
  contentType: string;
}

// Export the Prisma model
export const GeneralFormModel = prisma.generalForm;
