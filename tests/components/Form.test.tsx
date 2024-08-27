import { render, screen, fireEvent } from "@testing-library/react";

import Form from "../../components/Form";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "../mocks/routerMock";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    route: "/",
    pathname: "",
    query: {},
    asPath: "",
  }),
}));

describe("Form Component", () => {
  const mockSession: Session = {
    expires: "2024-08-26T00:00:00.000Z",
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      image: "http://example.com/image.jpg",
    },
  };

  beforeEach(() => {
    (useRouter).mockReturnValue({ push: jest.fn() });
  });

  test("renders form fields for step 1", () => {
    render(
      <SessionProvider session={mockSession}>
        <Form currStep={1} />
      </SessionProvider>
    );
    expect(screen.getByLabelText(/Your fullname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
  });

  test("handles button click", () => {
    const handleNext = jest.fn();
    render(
      <SessionProvider session={mockSession}>
        <Form currStep={1} handleNext={handleNext} />
      </SessionProvider>
    );
    fireEvent.click(screen.getByText(/Save & Continue/i));
    expect(handleNext).toHaveBeenCalled();
  });
});
