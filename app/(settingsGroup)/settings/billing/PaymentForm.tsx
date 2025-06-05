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

interface cardType {
  id: string;
  last4: string;
  exp_month: number;
  exp_year: number;
}

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [savedCards, setSavedCards] = useState<cardType[]>([]);

  // Fetch the saved card data from the backend
  useEffect(() => {
    const fetchSavedCards = async () => {
      try {
        const response = await fetch("/api/cards/save");
        const data = await response.json();
        setSavedCards(data);
      } catch (err) {
        setError("Failed to fetch saved cards.");
      }
    };

    fetchSavedCards();
  }, []);

  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000000).toString();
  };

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
      try {
        const newCard = {
          cardNumber: card.last4,
          cardHolderName: "Card Holder", // You might want to get this from a form input
          expiryDate: `${card.exp_month}/${card.exp_year}`,
          userId: "user-id-here" // You'll need to get this from your auth context
        };

        const response = await fetch("/api/cards/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCard),
        });

        const data = await response.json();

        if (data.cardId) {
          setSavedCards((prevCards: cardType[]) => [...prevCards, {
            id: data.cardId,
            last4: card.last4,
            exp_month: card.exp_month,
            exp_year: card.exp_year,
          }]);

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

  const removeCard = async (cardId: string) => {
    if (!savedCards) return;

    try {
      const response = await fetch(`/api/cards/save/${cardId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove card.");
      }

      setSavedCards((prevCards: cardType[]) =>
        prevCards.filter((card) => card.id !== cardId)
      );

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

      {savedCards && savedCards.length > 0 && (
        <div className="mt-4">
          <ul>
            {savedCards.map((card) => (
              <li key={card.id} className="flex justify-between items-center">
                <p className="font-bold">Card ending in {card.last4}</p>
                <button
                  type="button"
                  onClick={() => removeCard(card.id)}
                  className="px-4 py-2 my-4 mr-2 border rounded-lg"
                >
                  Remove Card
                </button>
              </li>
            ))}
          </ul>
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
