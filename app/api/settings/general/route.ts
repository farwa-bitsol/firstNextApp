import { connect } from "@/dbConfig/config";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import GeneralForm from "@/models/General";
import { NextRequest, NextResponse } from "next/server";
import { Buffer } from "buffer";

connect();

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const reqBody = await request.formData();

        // Fetch form fields
        const generalProfileFile = reqBody.get("generalProfile") as File | null;
        const firstName = (reqBody.get("firstName") as string) || "";
        const lastName = (reqBody.get("lastName") as string) || "";
        const location = (reqBody.get("location") as string) || "";
        const profession = (reqBody.get("profession") as string) || "";
        const bio = (reqBody.get("bio") as string) || "";
        const onlinePresence = JSON.parse(
            (reqBody.get("onlinePresence") as string) || "[]"
        );

        let generalProfile = null;

        if (generalProfileFile) {
            const fileBuffer = Buffer.from(await generalProfileFile.arrayBuffer());
            const base64Data = fileBuffer.toString("base64");

            generalProfile = {
                name: generalProfileFile.name,
                data: base64Data,
                contentType: generalProfileFile.type,
            };
        }

        // Check if the user form already exists
        let userForm = await GeneralForm.findOne({ userId });

        if (userForm) {
            // Update existing document
            userForm.generalProfile = generalProfile;
            userForm.firstName = firstName;
            userForm.lastName = lastName;
            userForm.location = location;
            userForm.profession = profession;
            userForm.bio = bio;
            userForm.onlinePresence = onlinePresence;

            await userForm.save();
        } else {
            // Create a new document
            userForm = new GeneralForm({
                userId,
                generalProfile,
                firstName,
                lastName,
                location,
                profession,
                bio,
                onlinePresence,
            });
            await userForm.save();
        }

        return NextResponse.json({
            message: "General data saved successfully.",
            success: true,
            data: userForm,
        });
    } catch (error: any) {
        console.error("Error in POST request:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}



export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const userForm = await GeneralForm.findOne({ userId });

        return NextResponse.json({
            message: "Form data retrieved successfully.",
            success: true,
            data: userForm ? {
                ...userForm.toObject(),
                generalProfile: userForm.generalProfile ? {
                    name: userForm.generalProfile.name,
                    data: userForm.generalProfile.data, // Base64-encoded string
                    contentType: userForm.generalProfile.contentType,
                } : null,
            } : null,
        });

    } catch (error: any) {
        console.error("Error in GET request:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch form data" },
            { status: 500 }
        );
    }
}
