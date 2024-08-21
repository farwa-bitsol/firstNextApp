import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchUsers, createUser } from "@/services/userService";
import { IUser } from "@/models/types";

const authOptions = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const fetchedUsers: IUser[] = await fetchUsers();
        const filteredEmail = fetchedUsers.find(
          (user) => credentials?.email === user.email
        );

        if (filteredEmail) {
          return {
            id: filteredEmail.id || "",
            email: filteredEmail.email,
          };
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          redirect_uri: "http://localhost:3001/api/auth/callback/google",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        // Handle user creation or updating in your database
        const fetchedUsers: IUser[] = await fetchUsers();
        const existingUser = fetchedUsers.find(
          (existingUser) => existingUser.email === user.email
        );

        if (!existingUser) {
          // Create a new user in your database
          await createUser({
            id: user.id || "",
            email: user.email as string,
            fullName: user.name as string,
            password: "",
          });
        }
      }
      return true; // Continue with sign-in
    },
    async session({ session, user }) {
      // Pass user data to the session
      session.user = user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
  },
});

export { authOptions as GET, authOptions as POST };
