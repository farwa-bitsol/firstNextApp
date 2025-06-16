import { connect } from "@/dbConfig/config";
import { NextRequest, NextResponse } from "next/server";
import { NotificationModel } from '@/models/Notification';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userId, weeklyNewsletter, accountSummary, websiteNotifications } = reqBody;

        const savedNotification = await NotificationModel.create({
            data: {
                userId,
                weeklyNewsletter,
                accountSummary,
                websiteNotifications,
            }
        });

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


