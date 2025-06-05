import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userDashboard", // Reference to the user collection
            required: true,
        },
        weeklyNewsletter: {
            type: Boolean,
            default: false,
        },
        accountSummary: {
            type: Boolean,
            default: false,
        },
        websiteNotifications: [
            {
                type: String,
            },
        ],
    },
    { collection: "notifications", timestamps: true }
);

const Notification =
    mongoose.models.notifications || mongoose.model("notifications", notificationSchema);

export default Notification;
