import { prisma } from '../dbConfig/config';
import { userOperations, postOperations } from '../dbConfig/db';

describe('Database Tests', () => {
  beforeAll(async () => {
    // Connect to the database
    await prisma.$connect();
  });

  afterAll(async () => {
    // Disconnect from the database
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Clean up the database before each test
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
  });

  test('should create a new user', async () => {
    const userData = {
      email: 'test@example.com',
      fullName: 'Test User',
      password: 'password123',
      isVerified: true,
    };

    const user = await userOperations.createUser(userData);
    expect(user).toBeDefined();
    expect(user.email).toBe(userData.email);
    expect(user.fullName).toBe(userData.fullName);
  });

  test('should find user by email', async () => {
    const userData = {
      email: 'test@example.com',
      fullName: 'Test User',
      password: 'password123',
      isVerified: true,
    };

    await userOperations.createUser(userData);
    const foundUser = await userOperations.findUserByEmail(userData.email);
    expect(foundUser).toBeDefined();
    expect(foundUser?.email).toBe(userData.email);
  });

  test('should create a post', async () => {
    // First create a user
    const user = await userOperations.createUser({
      email: 'test@example.com',
      fullName: 'Test User',
      password: 'password123',
      isVerified: true,
    });

    const postData = {
      userId: user.id,
      profilePhoto: 'photo.jpg',
      userName: 'Test User',
      title: 'Test Post',
      description: 'This is a test post',
      postTime: new Date().toISOString(),
      postType: 'normal',
    };

    const post = await postOperations.createPost(postData);
    expect(post).toBeDefined();
    expect(post.title).toBe(postData.title);
    expect(post.userId).toBe(user.id);
  });

  test('should get user posts', async () => {
    // First create a user
    const user = await userOperations.createUser({
      email: 'test@example.com',
      fullName: 'Test User',
      password: 'password123',
      isVerified: true,
    });

    // Create multiple posts
    const post1 = await postOperations.createPost({
      userId: user.id,
      profilePhoto: 'photo.jpg',
      userName: 'Test User',
      title: 'Post 1',
      description: 'First post',
      postTime: new Date().toISOString(),
      postType: 'normal',
    });

    const post2 = await postOperations.createPost({
      userId: user.id,
      profilePhoto: 'photo.jpg',
      userName: 'Test User',
      title: 'Post 2',
      description: 'Second post',
      postTime: new Date().toISOString(),
      postType: 'normal',
    });

    const posts = await postOperations.getPosts(user.id);
    expect(posts).toHaveLength(2);
    expect(posts[0].title).toBe('Post 2'); // Most recent first
    expect(posts[1].title).toBe('Post 1');
  });
}); 