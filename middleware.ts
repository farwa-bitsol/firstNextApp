import { withAuth } from "next-auth/middleware";

export default withAuth({

    pages: {
        signIn: "/user/signin", // Redirect here if not authenticated
    },
});

export const config = {
    matcher: [
        "/users/:path*",
        "/dashboard/:path*",
        "/settings/:path*",
    ],
};
