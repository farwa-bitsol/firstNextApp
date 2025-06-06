import { NextRequest, NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    // Redirect users without a token away from private paths
    if (!token) {
        return NextResponse.redirect(new URL('/user/signin', request.nextUrl));
    }

    // Allow users without a token to access public paths
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/users/:path*",
        "/dashboard/:path*",
        // "/settings/:path*",
        "/user/users"
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
