import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "@/components/Sidebar";

describe("Sidebar Component", () => {
  it("renders the background text correctly", () => {
    render(<Sidebar />);

    // Check if the text content is present in the document
    const textContent = screen.getByText(
      /The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software./i
    );
    expect(textContent).toBeInTheDocument();
  });

  it("renders the author's name correctly", () => {
    render(<Sidebar />);

    // Check if the author's name is present in the document
    const authorName = screen.getByText(/Vincent Obi/i);
    expect(authorName).toBeInTheDocument();
  });

  it("renders the text and author name in the correct order", () => {
    render(<Sidebar />);

    // Check if the text content appears before the author's name
    const textContent = screen.getByText(
      /The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software./i
    );
    const authorName = screen.getByText(/Vincent Obi/i);

    expect(textContent).toBeInTheDocument();
    expect(authorName).toBeInTheDocument();
    expect(textContent).toBeTruthy();
    expect(authorName).toBeTruthy();
  });
});
