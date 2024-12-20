import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchUsers } from "@/services/userService";
import { IUser } from "@/models/types";

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
