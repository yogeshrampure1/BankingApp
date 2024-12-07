import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomerDashboard from "./CustomerDashboard";

describe("Account Summary Page", () => {
  test("renders the Account Summary heading", () => {
    render(<CustomerDashboard />);

    const headingElement = screen.getByText(/Account Summary/i);
    expect(headingElement).toBeInTheDocument();
  });
});
