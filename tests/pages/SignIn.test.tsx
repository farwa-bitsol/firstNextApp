import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from "@/app/signin/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Mock the signIn function and useRouter hook
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Form Component", () => {
  const mockRouterPush = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("submits the form and redirects on successful login", async () => {
    // Mock successful signIn response
    (signIn as jest.Mock).mockResolvedValueOnce({ error: null });

    // Render the component
    render(<Form />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(screen.getByText(/login/i));

    // Wait for the redirection to happen
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/users");
    });
  });
});
