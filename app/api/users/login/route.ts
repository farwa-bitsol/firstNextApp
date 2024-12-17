import { connect } from "@/dbConfig/config";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }


        if (!user.isVerified) {
            //send verification email
            await sendEmail({ email, emailType: "VERIFY", userId: user._id })
            return NextResponse.json(
                { error: "Please verify your email before logging in." },
                { status: 400 }
            );
        }

        // Check password
        console.log('>>>password',password,'>>>suer',user.password)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
        }

        // Successful login (e.g., generate JWT)
        return NextResponse.json({ message: "Login successful" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
