import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { cardNumber, cardHolderName, expiryDate, userId } = await request.json();

    // Save card details to database
    const savedCard = await prisma.cardDetails.create({
      data: {
        cardNumber,
        cardHolderName,
        expiryDate,
        userId,
      },
    });

    return NextResponse.json({ 
      message: "Card details saved successfully",
      cardId: savedCard.id 
    });
  } catch (error) {
    console.error("Error saving card:", error);
    return NextResponse.json(
      { error: "Error saving card details" },
      { status: 500 }
    );
  }
}
