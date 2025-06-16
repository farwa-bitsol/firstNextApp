import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface UserImage {
  name: string;
  data: string;
  contentType: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  userImage: UserImage | null;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken: string | null;
  forgotPasswordTokenExpiry: Date | null;
  verifyToken: string | null;
  verifyTokenExpiry: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export default prisma.user;
