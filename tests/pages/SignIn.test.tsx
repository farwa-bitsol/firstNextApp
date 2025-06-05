import Form from "@/app/(usersGroup)/user/signin/form";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { useRouter } from "next/navigation";

jest.mock("axios");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Form Component", () => {
  it("submits form and redirects to 'user dashboard' on successful login", async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    (axios.post as jest.Mock).mockResolvedValue({
      data: { message: "Login success" },
    });

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

    // Wait for axios.post to be called with the correct arguments
    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith("/api/users/login", {
        email: "user@example.com",
        password: "password123",
      })
    );

    // Ensure the router push was called with the correct URL
    expect(mockPush).toHaveBeenCalledWith("/user/users");
  });
});
