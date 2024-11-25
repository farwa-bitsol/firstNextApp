"use client";
import { useState, useEffect } from "react";
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
    id: string;
    last4: string;
    exp_month: string;
    exp_year: string;
  } | null>(null);

  // Fetch the saved card data from the backend
  useEffect(() => {
    const fetchSavedCard = async () => {
      try {
        const response = await fetch("http://localhost:3000/customersCard");
        const data = await response.json();

        if (data[0].cards && data[0]?.cards?.length) {
          setSavedCard({
            id: data[0].cards[0].id,
            last4: data[0].cards[0].last4,
            exp_month: data[0].cards[0].exp_month,
            exp_year: data[0].cards[0].exp_year,
          });
        }
      } catch (err) {
        setError("Failed to fetch saved card.");
      }
    };

    fetchSavedCard();
  }, []);

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
      setSuccessMessage(null);
    } else if (token && token.card) {
      const { card } = token;
      // Send the token to your backend to save the card
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

        if (data.cards && data.cards.length > 0) {
          setSavedCard({
            id: data.cards[0].id,
            last4: data.cards[0].last4,
            exp_month: data.cards[0].exp_month,
            exp_year: data.cards[0].exp_year,
          });

          setSuccessMessage("Card saved successfully!");
          setError(null);
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

  const removeCard = async () => {
    if (!savedCard) return;

    try {
      const response = await fetch(
        `http://localhost:3000/customersCard/${savedCard.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove card.");
      }

      setSavedCard(null);
      setSuccessMessage("Card removed successfully!");
      setError(null);
    } catch (err) {
      setError("Error removing card. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="md:w-1/2 w-full">
          <CardElement />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        {successMessage && (
          <div className="text-green-500">{successMessage}</div>
        )}
        <button
          type="submit"
          disabled={!stripe}
          className="px-4 py-2 my-4 border rounded-lg"
        >
          Save Card
        </button>
      </form>

      {savedCard && (
        <div className="flex justify-between lg:w-1/2 w-full items-center">
          <p className="font-bold">Card ending in {savedCard.last4}</p>
          <button
            type="button"
            onClick={removeCard}
            className="px-4 py-2 my-4 mr-2 border rounded-lg"
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
