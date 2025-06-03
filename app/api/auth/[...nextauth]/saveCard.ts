import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-11-20.acacia",
// });

export async function POST(request: NextRequest) {
  try {
    // const { token } = await request.json();

    // const customer = await stripe.customers.create({
    //   source: token.id,
    //   description: "Customer for saving card info",
    // });

    // return NextResponse.json({ customerId: customer.id });
    return NextResponse.json({ message: "Card saving functionality temporarily disabled" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error Saving Card" },
      { status: 500 }
    );
  }
}
