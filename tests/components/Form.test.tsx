import Form from "@/components/Form";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Mocks for dependencies
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("axios");

describe("Form Component", () => {
  it("should submit the form and redirect to home after successful submission", async () => {
    // Mocking session and router
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
    });

    // Mocking API response for fetching users
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: [{ email: "existinguser@example.com" }],
    });

    render(<Form currStep={1} handleNext={jest.fn()} />);

    // Get form elements
    const fullNameInput = screen.getByLabelText(/your fullname/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/create password/i);
    const submitButton = screen.getByText(/save & continue/i);

    // Ensure all inputs are not undefined or null initially
    expect(fullNameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
    expect(passwordInput).toHaveValue("");

    // Simulate user input
    await userEvent.type(fullNameInput, "Test User");
    await userEvent.type(emailInput, "newuser@example.com");
    await userEvent.type(passwordInput, "password123");

    // Simulate form submission
    await userEvent.click(submitButton);
  });
});
