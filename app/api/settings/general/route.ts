import { getDataFromToken } from "@/helpers/getDataFromToken";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Buffer } from "buffer";
import { Prisma } from '@prisma/client';

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const reqBody = await request.formData();

        console.log("Form data received:", {
            hasGeneralProfile: !!reqBody.get("generalProfile"),
            firstName: reqBody.get("firstName"),
            lastName: reqBody.get("lastName"),
            location: reqBody.get("location"),
            profession: reqBody.get("profession"),
            bio: reqBody.get("bio"),
            onlinePresence: reqBody.get("onlinePresence"),
        });

        // Fetch form fields
        const generalProfileFile = reqBody.get("generalProfile") as File | null;
        const firstName = (reqBody.get("firstName") as string) || "";
        const lastName = (reqBody.get("lastName") as string) || "";
        const location = (reqBody.get("location") as string) || "";
        const profession = (reqBody.get("profession") as string) || "";
        const bio = (reqBody.get("bio") as string) || "";
        
        let onlinePresence = [];
        try {
            const onlinePresenceStr = reqBody.get("onlinePresence") as string;
            onlinePresence = onlinePresenceStr ? JSON.parse(onlinePresenceStr) : [];
        } catch (parseError) {
            console.error("Error parsing onlinePresence:", parseError);
            onlinePresence = [];
        }

        let generalProfile: any = null;

        if (generalProfileFile && generalProfileFile instanceof File) {
            try {
                const fileBuffer = Buffer.from(await generalProfileFile.arrayBuffer());
                const base64Data = fileBuffer.toString("base64");

                generalProfile = {
                    name: generalProfileFile.name,
                    data: base64Data,
                    contentType: generalProfileFile.type,
                };
            } catch (fileError) {
                console.error("Error processing file:", fileError);
                return NextResponse.json(
                    { error: "Failed to process uploaded file" },
                    { status: 400 }
                );
            }
        }

        // Check if the user form already exists
        let userForm = await prisma.generalForm.findUnique({ 
            where: { userId },
            include: { onlinePresence: true }
        });

        // Update user's fullName in the User table
        const fullName = `${firstName} ${lastName}`.trim();
        await prisma.user.update({
            where: { id: userId },
            data: { fullName }
        });

        if (userForm) {
            // Delete existing online presence records
            await prisma.onlinePresence.deleteMany({
                where: { generalFormId: userForm.id }
            });

            // Update existing document
            userForm = await prisma.generalForm.update({
                where: { userId },
                data: {
                    generalProfile,
                    firstName,
                    lastName,
                    location,
                    profession,
                    bio,
                    onlinePresence: {
                        create: onlinePresence.map((presence: any) => ({
                            url: presence.url
                        }))
                    }
                },
                include: { onlinePresence: true }
            });
        } else {
            // Create a new document
            userForm = await prisma.generalForm.create({
                data: {
                    userId,
                    generalProfile,
                    firstName,
                    lastName,
                    location,
                    profession,
                    bio,
                    onlinePresence: {
                        create: onlinePresence.map((presence: any) => ({
                            url: presence.url
                        }))
                    }
                },
                include: { onlinePresence: true }
            });
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
        const userForm = await prisma.generalForm.findUnique({ 
            where: { userId },
            include: { onlinePresence: true }
        });

        return NextResponse.json({
            message: "Form data retrieved successfully.",
            success: true,
            data: userForm ? {
                ...userForm,
                generalProfile: userForm.generalProfile ? {
                    name: (userForm.generalProfile as any).name,
                    data: (userForm.generalProfile as any).data,
                    contentType: (userForm.generalProfile as any).contentType,
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
