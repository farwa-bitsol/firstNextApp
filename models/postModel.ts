import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface PostMedia {
  name: string;
  data: string;
  contentType: string;
}

export interface Post {
  id: string;
  userId: string;
  profilePhoto: string | null;
  postMedia: PostMedia | null;
  userName: string;
  title: string | null;
  description: string | null;
  postType: 'event' | 'article' | 'normal';
  likes: number;
  comments: number;
  shares: number;
  postTime: string;
  createdAt: Date;
  updatedAt: Date;
}

export default prisma.post;
