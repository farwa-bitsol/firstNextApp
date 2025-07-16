import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function getDataFromToken(request: NextRequest) {
    try {
        console.log('getDataFromToken - Starting token extraction');
        
        const token = await getToken({ 
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
            secureCookie: process.env.NODE_ENV === "production"
        });
        
        console.log('getDataFromToken - Token received:', !!token);
        console.log('getDataFromToken - Token ID:', token?.id);
        
        if (!token?.id) {
            console.log('getDataFromToken - No token ID found');
            throw new Error("Not authenticated");
        }
        
        console.log('getDataFromToken - Successfully extracted user ID:', token.id);
        return token.id as string;
    } catch (error: any) {
        console.error('getDataFromToken - Error:', error);
        console.error('getDataFromToken - Error stack:', error.stack);
        throw new Error(`Token extraction failed: ${error.message}`);
    }
} 
