import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
<<<<<<< Updated upstream
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchUsers } from "@/services/userService";
import { IUser } from "@/models/types";
=======
import { userOperations } from "@/dbConfig/db";

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
>>>>>>> Stashed changes

const authOptions = NextAuth({
  session: {
    strategy: "jwt",
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
      async authorize(credentials, req) {
        const fetchedUsers: IUser[] = await fetchUsers();
        const filteredEmail = fetchedUsers.find(
          (user) => credentials?.email === user.email
        );

        if (filteredEmail) {
          return {
            id: filteredEmail.id || "",
            email: filteredEmail.email,
            name: filteredEmail.fullName,
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
          redirect_uri: "http://localhost:3001/user/signin",
        },
      },
    }),
  ],
  callbacks: {
<<<<<<< Updated upstream
    async session({ session, user }) {
      // Pass user data to the session
      session.user = user;
=======
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
      if (session.user) {
        session.user.id = token.id as string;
      }
>>>>>>> Stashed changes
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

export { authOptions as GET, authOptions as POST };
