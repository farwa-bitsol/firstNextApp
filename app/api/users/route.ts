import { connect } from "@/dbConfig/config";
import { userOperations } from "@/dbConfig/db";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

connect();

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
    } catch (error: any) {
        console.error("Error in PATCH request:", error);
        return NextResponse.json(
            { error: error.message || "Failed to update user image" },
            { status: 500 }
        );
    }
}
