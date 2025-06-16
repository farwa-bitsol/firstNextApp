import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteUser from "@/components/DeleteUser";
import { IUser } from "@/models/types";

// Mock the useMutation hook
jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

describe("DeleteUser", () => {
  const mockUser: IUser = {
    _id: "123",
    id: "123",
    fullName: "Test User",
    email: "test@example.com",
    password: "hashedPassword",
    userImage: null,
    isVerified: true,
    isAdmin: false,
    forgotPasswordToken: null,
    forgotPasswordTokenExpiry: null,
    verifyToken: null,
    verifyTokenExpiry: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockDeleteMutation = jest.fn();
  const mockQueryClient = {
    invalidateQueries: jest.fn(),
  };

  beforeEach(() => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockDeleteMutation,
      isLoading: false,
    });
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  });

  it("renders delete button", () => {
    render(<DeleteUser user={mockUser} />);
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("shows confirmation dialog before deleting", async () => {
    const mockConfirm = jest.spyOn(window, "confirm");
    mockConfirm.mockImplementation(() => true);

    render(<DeleteUser user={mockUser} />);
    fireEvent.click(screen.getByText("Delete"));

    expect(mockConfirm).toHaveBeenCalledWith(
      "Are you sure you want to delete this user?"
    );
    expect(mockDeleteMutation).toHaveBeenCalledWith(mockUser._id);
  });

  it("does not delete if user cancels confirmation", async () => {
    const mockConfirm = jest.spyOn(window, "confirm");
    mockConfirm.mockImplementation(() => false);

    render(<DeleteUser user={mockUser} />);
    fireEvent.click(screen.getByText("Delete"));

    expect(mockConfirm).toHaveBeenCalled();
    expect(mockDeleteMutation).not.toHaveBeenCalled();
  });

  it("shows loading state when deleting", () => {
    (useMutation as jest.Mock).mockReturnValue({
      mutate: mockDeleteMutation,
      isLoading: true,
    });

    render(<DeleteUser user={mockUser} />);
    expect(screen.getByText("Deleting...")).toBeInTheDocument();
  });
});
