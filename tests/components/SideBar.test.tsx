import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sidebar from "@/components/Sidebar";

describe("Sidebar Component", () => {
  it("renders the background image correctly", () => {
    render(<Sidebar />);

    // Check if the background image is rendered with the correct src and alt attributes
    const bgImage = screen.getByAltText("background image");
    expect(bgImage).toBeInTheDocument();
    expect(bgImage).toHaveAttribute("src", "/images/bg.jpeg");
  });

  it("renders the logo image correctly", () => {
    render(<Sidebar />);

    // Check if the logo image is rendered with the correct src, alt, width, and height attributes
    const logoImage = screen.getByAltText("logo");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("src", "/images/logo.svg");
    expect(logoImage).toHaveAttribute("width", "100");
    expect(logoImage).toHaveAttribute("height", "100");
  });

  it("renders the text content correctly", () => {
    render(<Sidebar />);

    // Check if the text content is present in the document
    expect(
      screen.getByText(
        /The passage experienced a surge in popularity during the 1960s/i
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/Vincent Obi/i)).toBeInTheDocument();
  });

  it("renders the check image correctly", () => {
    render(<Sidebar />);

    // Check if the check image is rendered with the correct src and alt attributes
    const checkImage = screen.getByAltText("check mark"); // Updated alt text for the check mark image
    expect(checkImage).toBeInTheDocument();
    expect(checkImage).toHaveAttribute("src", "/images/check.svg");
  });
});
