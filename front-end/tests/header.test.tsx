import { render, screen } from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom';
import { useRouter } from "next/router";
import { useAuth } from "../components/AuthProvider";
import Header from "../components/header/Header";

window.React = React;

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../components/AuthProvider", () => ({
  useAuth: jest.fn(),
}));

describe("Header Component", () => {
  const mockTranslations = jest.fn((key) => key);
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      pathname: "/",
      push: mockPush,
    });
    (useAuth as jest.Mock).mockReturnValue({
      data: { email: "test@example.com", userType: "Student" },
    });
  });

  it("renders the header with title and brand image", () => {
    render(<Header translations={mockTranslations} />);

    expect(screen.getByAltText("ucll")).toBeInTheDocument();
    expect(screen.getByText("header.title")).toBeInTheDocument();
  });

  it("renders the home button as the current page when on the homepage", () => {
    render(<Header translations={mockTranslations} />);

    expect(screen.getByText("header.homeButton")).toHaveClass("shadow-activated bg-success");
  });

  it("renders the login button when user is not authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({ data: {} });

    render(<Header translations={mockTranslations} />);

    expect(screen.getByText("header.loginButton")).toBeInTheDocument();
    expect(screen.getByText("header.loginButton")).toHaveClass("shadow-regular bg-danger");
  });

  it("renders the profile button with user email when authenticated", () => {
    render(<Header translations={mockTranslations} />);

    expect(screen.getByText("T")).toBeInTheDocument(); // First letter of email
    expect(screen.getByText("T").closest("a")).toHaveAttribute("href", expect.stringContaining("test@example.com"));
  });

  it("renders the language selector with options", () => {
    render(<Header translations={mockTranslations} />);

    expect(screen.getByLabelText("header.language")).toBeInTheDocument();
    expect(screen.getByLabelText("header.language")).toHaveDisplayValue("English");
    expect(screen.getByLabelText("header.language")).toContainElement(screen.getByText("Nederlands"));
  });
});
