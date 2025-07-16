import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/dbConfig/config";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
    try {
        console.log('GET /api/users/me - Starting request');
        
        let userId: string;
        
        try {
            // Try the custom getDataFromToken function first
            userId = await getDataFromToken(request);
            console.log('GET /api/users/me - User ID extracted via getDataFromToken:', userId);
        } catch (tokenError) {
            console.log('GET /api/users/me - getDataFromToken failed, trying direct getToken');
            
            // Fallback: try direct getToken approach
            const token = await getToken({ 
                req: request,
                secret: process.env.NEXTAUTH_SECRET,
                secureCookie: process.env.NODE_ENV === "production"
            });
            
            if (!token?.id) {
                console.log('GET /api/users/me - No token ID found in fallback');
                return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
            }
            
            userId = token.id as string;
            console.log('GET /api/users/me - User ID extracted via fallback:', userId);
        }
        
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                fullName: true,
                email: true,
                userImage: true,
                isVerified: true,
                isAdmin: true,
                createdAt: true,
                updatedAt: true
            }
        });
        
        console.log('GET /api/users/me - User found:', !!user);
        
        if (!user) {
            console.log('GET /api/users/me - User not found in database');
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        return NextResponse.json({
            message: "User found",
            data: user
        });
    } catch (error: any) {
        console.error('GET /api/users/me - Error:', error);
        console.error('GET /api/users/me - Error stack:', error.stack);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}