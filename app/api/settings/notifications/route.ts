import { connect } from "@/dbConfig/config";
import { NextRequest, NextResponse } from "next/server";
import Notification from "@/models/Notification";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userId, weeklyNewsletter, accountSummary, websiteNotifications } = reqBody;

        const newNotification = new Notification({
            userId,
            weeklyNewsletter,
            accountSummary,
            websiteNotifications,
        });

        const savedNotification = await newNotification.save();

        return NextResponse.json({
            message: "Notification preferences saved successfully.",
            success: true,
            data: savedNotification,
        });
    } catch (error: any) {
        console.error("Error saving notification preferences:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}


