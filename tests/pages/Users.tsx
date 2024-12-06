import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { fetchUsers } from "@/services/userService";
import { IUser } from "@/models/types";
import Users from "@/app/(usersGroup)/user/users/page";

jest.mock("@/services/userService");
jest.mock("@/components/DeleteUser", () => {
  const DeleteUser = (props: any) => (
    <div data-testid={`delete-user-${props.user.id}`} />
  );
  DeleteUser.displayName = "DeleteUser";
  return DeleteUser;
});
jest.mock("@/components/Pagination", () => {
  const Pagination = (props: any) => (
    <button onClick={() => props.setCurrentPage(props.currentPage + 1)}>
      Next Page
    </button>
  );
  Pagination.displayName = "Pagination";
  return Pagination;
});
jest.mock("@/components/Logout", () => {
  const Logout = () => <button>Logout</button>;
  Logout.displayName = "Logout";
  return Logout;
});

describe("Users Component", () => {
  const mockUsers: IUser[] = [
    { id: "1", fullName: "User 1", email: "", password: "" },
    { id: "2", fullName: "User 2", email: "", password: "" },
  ];

  beforeEach(() => {
    (fetchUsers as jest.Mock).mockResolvedValue(mockUsers);
  });

  test("renders users and pagination correctly", async () => {
    render(<Users />);

    // Check if Logout component is rendered
    expect(screen.getByText("Logout")).toBeInTheDocument();

    // Wait for users to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByTestId("delete-user-1")).toBeInTheDocument();
      expect(screen.getByTestId("delete-user-2")).toBeInTheDocument();
    });

    // Check if Pagination component is rendered
    expect(screen.getByText("Next Page")).toBeInTheDocument();
  });

  test("fetches users on mount and when page changes", async () => {
    render(<Users />);

    // Ensure fetchUsers is called once on mount
    expect(fetchUsers).toHaveBeenCalledTimes(1);

    // Simulate clicking "Next Page"
    fireEvent.click(screen.getByText("Next Page"));

    // Ensure fetchUsers is called again when the page changes
    await waitFor(() => {
      expect(fetchUsers).toHaveBeenCalledTimes(2);
      expect(fetchUsers).toHaveBeenCalledWith(2); // currentPage is updated to 2
    });
  });
});
