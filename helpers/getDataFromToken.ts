import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function getDataFromToken(request: NextRequest) {
    try {
        const token = await getToken({ req: request });
        if (!token?.id) {
            throw new Error("Not authenticated");
        }
        return token.id as string;
    } catch (error: any) {
        throw new Error(error.message);
    }
} 