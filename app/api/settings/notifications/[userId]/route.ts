
import { connect } from "@/dbConfig/config";
import { NextRequest, NextResponse } from "next/server";
import Notification from "@/models/Notification";

connect();


export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
    try {
        const { userId } = params
        if (!userId) {
            return NextResponse.json(
                { error: "User ID is required." },
                { status: 400 }
            );
        }

        const notifications = await Notification.findOne({ userId });

        return NextResponse.json({
            message: "Notification preferences retrieved successfully.",
            success: true,
            data: notifications,
        });
    } catch (error: any) {
        console.error("Error retrieving notification preferences:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch notifications" },
            { status: 500 }
        );
    }
}