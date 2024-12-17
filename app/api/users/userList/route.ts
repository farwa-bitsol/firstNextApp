import { connect } from "@/dbConfig/config";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
    try {
        console.log("Fetching all users...");

        // Fetch all users, excluding the password field
        const users = await User.find({}).select("-password");


        console.log("Retrieved users:", users);

        return NextResponse.json({
            success: true,
            message: "Users fetched successfully",
            users,
        });
    } catch (error: any) {
        console.error("Error fetching users:", error.message);

        return NextResponse.json({
            success: false,
            error: error.message || "An error occurred while fetching users",
        }, { status: 500 });
    }
}
