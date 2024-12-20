import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useMutation, useQueryClient } from "react-query";
import DeleteUser from "@/components/DeleteUser";

jest.mock("react-query", () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(),
}));

describe("DeleteUser Component", () => {
  const mockUser = {
    id: "1",
    fullName: "John Doe",
    email: "john.doe@example.com",
    password: "password123",
  };

  let mockHandleDelete: jest.Mock;
  let mockQueryClient: jest.Mocked<ReturnType<typeof useQueryClient>>;

  beforeEach(() => {
    mockHandleDelete = jest.fn();
    mockQueryClient = {
      invalidateQueries: jest.fn(),
    } as unknown as jest.Mocked<ReturnType<typeof useQueryClient>>;

    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
    (useMutation as jest.Mock).mockImplementation(() => ({
      mutate: mockHandleDelete,
      isLoading: false,
      isError: false,
      error: null,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders user information correctly", () => {
    render(<DeleteUser user={mockUser} />);

    expect(screen.getByText(mockUser.fullName)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  it("calls the delete function when the delete button is clicked", async () => {
    render(<DeleteUser user={mockUser} />);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockHandleDelete).toHaveBeenCalledWith(mockUser.id);
    });
  });

  it("disables the delete button while loading", () => {
    (useMutation as jest.Mock).mockImplementation(() => ({
      mutate: mockHandleDelete,
      isLoading: true,
      isError: false,
      error: null,
    }));

    render(<DeleteUser user={mockUser} />);

    const deleteButton = screen.getByRole("button", { name: /deleting.../i });
    expect(deleteButton).toBeDisabled();
  });

  it("displays an error message if delete fails", () => {
    (useMutation as jest.Mock).mockImplementation(() => ({
      mutate: mockHandleDelete,
      isLoading: false,
      isError: true,
      error: new Error("Failed to delete user"),
    }));

    render(<DeleteUser user={mockUser} />);

    expect(screen.getByText(/failed to delete user/i)).toBeInTheDocument();
  });

  it("invalidates the users query on successful deletion", async () => {
    (useMutation as jest.Mock).mockImplementation((_, options) => ({
      mutate: jest.fn((userId: string) => {
        options?.onSuccess?.();
      }),
      isLoading: false,
      isError: false,
      error: null,
    }));

    render(<DeleteUser user={mockUser} />);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockQueryClient.invalidateQueries).toHaveBeenCalledWith("users");
    });
  });
});
