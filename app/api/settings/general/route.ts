import { connect } from "@/dbConfig/config";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import GeneralForm from "@/models/General";
import { NextRequest, NextResponse } from "next/server";

connect();


export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const reqBody = await request.formData();

        const generalProfileFile = reqBody.get("generalProfile") as File | null;
        const firstName = reqBody.get("firstName") as string;
        const lastName = reqBody.get("lastName") as string;
        const location = reqBody.get("location") as string;
        const profession = reqBody.get("profession") as string;
        const bio = reqBody.get("bio") as string;
        const onlinePresence = JSON.parse(reqBody.get("onlinePresence") as string || "[]");

        let generalProfile = null;

        if (generalProfileFile) {
            const bufferData = await generalProfileFile.arrayBuffer();
            const buffer = Buffer.from(bufferData);
            const base64Data = buffer.toString("base64");

            generalProfile = {
                name: generalProfileFile.name,
                data: base64Data,
                contentType: generalProfileFile.type,
            };
        }

        const formData = {
            userId,
            generalProfile,
            firstName,
            lastName,
            location,
            profession,
            bio,
            onlinePresence,
        };


        let userForm = await GeneralForm.findOne({ userId });

        if (userForm) {
            // Update existing document
            Object.assign(userForm, formData);
            await userForm.save();
        } else {
            // Create a new document
            userForm = new GeneralForm(formData);
            await userForm.save();
        }

        return NextResponse.json({
            message: "Form data saved successfully.",
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

        if (!userForm) {
            return NextResponse.json({
                message: "No form data found for the user.",
                success: false,
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "Form data retrieved successfully.",
            success: true,
            data: userForm,
        });
    } catch (error: any) {
        console.error("Error in GET request:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch form data" },
            { status: 500 }
        );
    }
}
