import { prisma } from './config';

// User operations
export const userOperations = {
  createUser: async (userData: any) => {
    return await prisma.user.create({
      data: userData,
    });
  },

  findUserByEmail: async (email: string) => {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  findUserById: async (id: string) => {
    return await prisma.user.findUnique({
      where: { id },
    });
  },

  updateUser: async (id: string, data: any) => {
    return await prisma.user.update({
      where: { id },
      data,
    });
  },

  getAllUsers: async () => {
    return await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
  },
};

// Post operations
export const postOperations = {
  createPost: async (postData: any) => {
    return await prisma.post.create({
      data: postData,
    });
  },

  getPosts: async (userId: string) => {
    return await prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  getPostById: async (id: string) => {
    return await prisma.post.findUnique({
      where: { id },
    });
  },

  updatePost: async (id: string, data: any) => {
    return await prisma.post.update({
      where: { id },
      data,
    });
  },

  deletePost: async (id: string) => {
    return await prisma.post.delete({
      where: { id },
    });
  },
}; 