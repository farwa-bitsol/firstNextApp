import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          redirect_uri: "http://localhost:3000/api/auth/callback/google",
        },
      },
    }),
  ],
});

export { authOptions as GET, authOptions as POST };
