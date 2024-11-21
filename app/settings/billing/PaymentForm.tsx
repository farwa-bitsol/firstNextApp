"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [savedCard, setSavedCard] = useState<{
    last4: string;
    exp_month: string;
    exp_year: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Card element not found");
      return;
    }

    const { token, error: stripeError } = await stripe.createToken(cardElement);

    if (stripeError) {
      setError(stripeError?.message ?? "Failed to save card");
      setSuccessMessage(null); // Reset success message on error
    } else if (token && token.card) {
      const { card } = token;
      // Send the token to your mock backend to save the card
      try {
        const response = await fetch(`http://localhost:3000/customersCard`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cards: [
              {
                last4: card.last4,
                exp_month: card.exp_month,
                exp_year: card.exp_year,
              },
            ],
          }),
        });

        const data = await response.json();

        if (data.cards) {
          setSavedCard({
            last4: data.cards[0].last4,
            exp_month: data.cards[0].exp_month,
            exp_year: data.cards[0].exp_year,
          });

          setSuccessMessage("Card saved successfully!");
          setError(null); // Reset any previous errors
        } else {
          setError("Failed to save card.");
        }
      } catch (err) {
        setError("Error saving card. Please try again.");
      }
    } else {
      setError("No card information found.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="md:w-1/2  w-full">
          <CardElement />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        {successMessage && (
          <div className="text-green-500">{successMessage}</div>
        )}
        <button
          type="submit"
          disabled={!stripe}
          className={`px-4 py-2 my-4 border rounded-lg`}
        >
          Save Card
        </button>
      </form>

      {/* Display saved card info if available */}
      {savedCard && (
        <div className="flex justify-between md:w-1/2  w-full items-center">
          <p className="font-bold">Card ending in {savedCard.last4}</p>
          <button
            type="submit"
            disabled={!stripe}
            className={`px-4 py-2 my-4 border rounded-lg`}
          >
            Remove Card
          </button>
        </div>
      )}
    </div>
  );
};

const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default PaymentPage;
