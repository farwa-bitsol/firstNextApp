import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { IUser } from "@/models/types";
import Users from "@/app/(usersGroup)/user/users/page";

global.fetch = jest.fn();

jest.mock("@/components/DeleteUser", () => {
  const DeleteUser = (props: any) => (
    <div data-testid={`delete-user-${props.user._id}`} />
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
    {
      _id: "1",
      id: "1",
      fullName: "User 1",
      email: "user1@test.com",
      password: "password123",
      userImage: null,
      isVerified: true,
      isAdmin: false,
      forgotPasswordToken: null,
      forgotPasswordTokenExpiry: null,
      verifyToken: null,
      verifyTokenExpiry: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: "2",
      id: "2",
      fullName: "User 2",
      email: "user2@test.com",
      password: "password123",
      userImage: null,
      isVerified: true,
      isAdmin: false,
      forgotPasswordToken: null,
      forgotPasswordTokenExpiry: null,
      verifyToken: null,
      verifyTokenExpiry: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  beforeEach(() => {
    (fetch as jest.Mock).mockImplementation((url: string) => {
      const params = new URL(url).searchParams;
      const page = params.get("_page") || "1";

      if (page === "1") {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockUsers),
        });
      }

      if (page === "2") {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              { _id: "3", fullName: "User 3", email: "", password: "", userImage: null },
            ]),
        });
      }

      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Page not found" }),
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
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

    // Ensure fetch is called once on mount
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/users?_page=1&_limit=4")
    );

    // Simulate clicking "Next Page"
    fireEvent.click(screen.getByText("Next Page"));

    // Ensure fetch is called again when the page changes
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/users?_page=2&_limit=4")
      );
    });

    // Verify the new user is displayed
    await waitFor(() => {
      expect(screen.getByTestId("delete-user-3")).toBeInTheDocument();
    });
  });
});
