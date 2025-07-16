import { connect } from "@/dbConfig/config";
import { userOperations } from "@/dbConfig/db";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/models/types";
import { User } from "@prisma/client";

connect();

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (email) {
            // Get specific user by email
            const user = await userOperations.findUserByEmail(email);
            
            if (!user) {
                return NextResponse.json(
                    { error: "User not found" },
                    { status: 404 }
                );
            }

            // Remove sensitive data from response
            const sanitizedUser = {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                isVerified: user.isVerified,
                isAdmin: user.isAdmin,
                userImage: user.userImage,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };

            return NextResponse.json(sanitizedUser);
        }

        // Get all users (when no email parameter is provided)
        const users = await userOperations.getAllUsers();
        
        // Remove sensitive data from response
        const sanitizedUsers = users.map((user: User) => ({
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            isVerified: user.isVerified,
            isAdmin: user.isAdmin,
            userImage: user.userImage,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }));

        return NextResponse.json({
            message: "Users fetched successfully",
            users: sanitizedUsers
        });
    } catch (error) {
        const apiError = error as ApiError;
        const errorMessage =
            apiError?.response?.data?.error ||
            apiError?.message ||
            "An error occurred";
            
        console.error("Error in GET request:", error);
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        // Retrieve the user ID from the token
        const userId = await getDataFromToken(request);

        // Parse the form data from the request
        const formData = await request.formData();
        const userImageFile = formData.get("userImage") as File;

        if (!userImageFile) {
            return NextResponse.json(
                { error: "No image file provided" },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(userImageFile.type)) {
            return NextResponse.json(
                { error: "Invalid file type. Only JPEG, PNG and GIF are allowed" },
                { status: 400 }
            );
        }

        // Validate file size (2MB limit)
        if (userImageFile.size > 2 * 1024 * 1024) {
            return NextResponse.json(
                { error: "File size too large. Maximum size is 2MB" },
                { status: 400 }
            );
        }

        // Convert the file to a format suitable for storage
        const arrayBuffer = await userImageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const userImage = {
            name: userImageFile.name,
            data: buffer.toString("base64"),
            contentType: userImageFile.type,
        };

        // Find and update the user in the database
        const user = await userOperations.updateUser(userId, {
            userImage
        });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "User image added or updated successfully",
            user,
        });
    } catch (error) {
        const apiError = error as ApiError;
        const errorMessage =
            apiError?.response?.data?.error ||
            apiError?.message ||
            "An error occurred";
            
        console.error("Error in PATCH request:", error);
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
