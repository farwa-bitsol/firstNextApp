import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser } from "@/models/types";
import axios from "axios";


const fetchUsersFromAPI = async (page: number): Promise<IUser[]> => {
  const response = await axios.get(`/api/users/userList`);

  if (response.status !== 200) {
    throw new Error(response.statusText || "Failed to fetch users");
  }

  return response.data;
};

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

        const users: IUser[] = await fetchUsersFromAPI(1);
        const filteredUser = users.find((user) => user.email === credentials?.email);

        if (filteredUser) {
          return {
            id: filteredUser.id || "",
            email: filteredUser.email,
            name: filteredUser.fullName,
          };
        }

        return null; // Return null if no user found
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          redirect_uri: "http://localhost:3001/user/signin", // saved in Google OAuth setup
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
