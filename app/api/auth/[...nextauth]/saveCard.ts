import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-11-20.acacia",
// });

<<<<<<< Updated upstream
export default async function handler(req, res) {
    if (req.method === "POST") {
        const { token } = req.body;
=======
export async function POST(request: NextRequest) {
  try {
    // const { token } = await request.json();
>>>>>>> Stashed changes

    // const customer = await stripe.customers.create({
    //   source: token.id,
    //   description: "Customer for saving card info",
    // });

<<<<<<< Updated upstream
            res.status(200).json({ customerId: customer.id });
        } catch (error) {
            res.status(500).json({ error: error?.message ? "Error Saving Card" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
=======
    // return NextResponse.json({ customerId: customer.id });
    return NextResponse.json({ message: "Card saving functionality temporarily disabled" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error Saving Card" },
      { status: 500 }
    );
  }
>>>>>>> Stashed changes
}
