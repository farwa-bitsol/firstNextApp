import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/user/signin",
    },
  }
);

export const config = {
  matcher: [
    "/user/users/:path*",
    "/dashboard/:path*",
    "/settings/:path*",
    "/user/users",
  ],
};

// export default withAuth({

//     pages: {
//         signIn: "/user/signin", // Redirect here if not authenticated
//     },
// });

// export const config = {
//     matcher: [
//         "/users/:path*",
//         "/dashboard/:path*",
//         "/settings/:path*",
//     ],
// };
