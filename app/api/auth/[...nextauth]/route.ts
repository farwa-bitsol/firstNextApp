import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { userOperations } from "@/dbConfig/db";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

const authOptions = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.error("Missing credentials:", { email: !!credentials?.email, password: !!credentials?.password });
            throw new Error("Email and password are required");
          }
          
          const user = await userOperations.findUserByEmail(credentials.email);
          
          if (!user) {
            console.error("No user found for email:", credentials.email);
            throw new Error("No user found with this email");
          }

          if (!user.password) {
            console.error("User has no password set:", credentials.email);
            throw new Error("Please sign in with Google");
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          
          if (!isValid) {
            console.error("Invalid password for user:", credentials.email);
            throw new Error("Invalid password");
          }

          return {
            id: user.id,
            email: user.email,
            name: user.fullName,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          throw error;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          redirect_uri: process.env.NEXTAUTH_URL 
            ? `${process.env.NEXTAUTH_URL}/user/signin`
            : "http://localhost:3001/user/signin",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const existingUser = await userOperations.findUserByEmail(user.email!);
          
          if (!existingUser) {
            // Create new user if doesn't exist
            await userOperations.createUser({
              email: user.email!,
              fullName: user.name!,
              password: "", // You might want to generate a random password
              isVerified: true,
            });
          }
          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
});

// Validate required environment variables
if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET is not set in environment variables");
}

export { authOptions as GET, authOptions as POST };
