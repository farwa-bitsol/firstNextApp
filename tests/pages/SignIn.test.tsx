import Form from "@/app/(usersGroup)/user/signin/form";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Mocking next-auth's signIn function and next/navigation's useRouter
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Form Component", () => {
  it("submits form and redirects to 'user dashboard' on successful login", async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (signIn as jest.Mock).mockResolvedValue({ error: null }); // Simulate a successful login

    render(<Form />);

    // Get form elements
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByText(/login/i);

    // Simulate user entering email and password
    await userEvent.type(emailInput, "user@example.com");
    await userEvent.type(passwordInput, "password123");

    // Simulate form submission
    await userEvent.click(submitButton);

    // Wait for the signIn function to be called with the correct arguments
    await waitFor(() =>
      expect(signIn).toHaveBeenCalledWith("credentials", {
        email: "user@example.com",
        password: "password123",
        redirect: false,
      })
    );

    // Ensure the router push was called with the correct URL
    expect(mockPush).toHaveBeenCalledWith("/user/users");
  });
});
