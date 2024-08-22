import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeleteUser from "@/components/DeleteUser";
import { deleteUser } from "@/services/userService";

// Mock the deleteUser function
jest.mock("@/services/userService", () => ({
  deleteUser: jest.fn(),
}));

describe("DeleteUser Component", () => {
  const mockUser = {
    id: "123",
    fullName: "John Doe",
    email: "123@gmail.com",
    password: "",
  };

  it("renders the user full name and a delete button", () => {
    render(<DeleteUser user={mockUser} />);

    // Check if the user's full name is displayed
    expect(screen.getByText("John Doe")).toBeInTheDocument();

    // Check if the delete button is rendered
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("calls deleteUser with the correct userId when the delete button is clicked", async () => {
    const mockDeleteUser = deleteUser as jest.MockedFunction<typeof deleteUser>;
    mockDeleteUser.mockResolvedValueOnce({}); // Mock successful deletion

    render(<DeleteUser user={mockUser} />);

    // Click the delete button
    fireEvent.click(screen.getByText("Delete"));

    // Check if deleteUser was called with the correct user ID
    expect(mockDeleteUser).toHaveBeenCalledWith("123");
  });
});
