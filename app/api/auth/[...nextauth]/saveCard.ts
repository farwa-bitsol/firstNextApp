import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json({ message: "Card saving functionality temporarily disabled" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error Saving Card" },
      { status: 500 }
    );
  }
}
