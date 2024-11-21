import Stripe from "stripe";

const stripe = new Stripe("YOUR_SECRET_KEY");

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { token } = req.body;

        try {
            const customer = await stripe.customers.create({
                source: token.id,
                description: "Customer for saving card info",
            });

            res.status(200).json({ customerId: customer.id });
        } catch (error) {
            res.status(500).json({ error: error?.message ? "Error Saving Card" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
