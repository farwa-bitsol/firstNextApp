// import { withAuth } from "next-auth/middleware";
import { NextResponse, NextRequest } from 'next/server'

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



export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isPublicPath = path.includes('/signin') || path.includes('/forms') || path.includes('/verifyemail')

    const token = request.cookies.get('token')?.value || ''

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/signin', request.nextUrl))
    }

}


// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/user/users',
        '/user/signin',
        '/user/forms',
        '/user/verifyemail'
    ]
}
