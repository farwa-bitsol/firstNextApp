import { connect } from "@/dbConfig/config";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function PATCH(request: NextRequest) {
    try {
        // Retrieve the user ID from the token
        const userId = await getDataFromToken(request);

        // Parse the form data from the request
        const formData = await request.formData();
        const userImageFile = formData.get("userImage") as File;

        // Convert the file to a format suitable for storage
        const arrayBuffer = await userImageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const userImage = {
            name: userImageFile.name,
            data: buffer.toString("base64"),
            contentType: userImageFile.type,
        };

        // Find the user in the database
        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        console.log('>>>>found user', user)
        user.userImage = userImage;

        // Save the updated user object to the database
        await user.save();

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
