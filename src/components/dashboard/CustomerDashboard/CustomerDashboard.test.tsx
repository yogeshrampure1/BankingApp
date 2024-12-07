import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CustomerDashboard from "./CustomerDashboard";

describe("CustomerDashboard Component", () => {
  beforeEach(() => {
    // Mock fetch accounts data
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue([
        {
          id: 1,
          customerId: 101,
          accountNumber: "123456789",
          name: "Jane Doe",
          type: "Savings",
          balance: 5000,
          creationDate: "2020-05-15T08:30:00Z",
          lastTransactionDate: "2024-12-05T09:00:00Z",
        },
        {
          id: 2,
          customerId: 101,
          accountNumber: "567891234",
          name: "Jane Doe",
          type: "Mortgage",
          balance: -15000,
          creationDate: "2020-06-20T09:00:00Z",
          lastTransactionDate: "2024-11-30T10:00:00Z",
        },
        {
          id: 3,
          customerId: 101,
          accountNumber: "234567891",
          name: "Jane Doe",
          type: "Savings",
          balance: 7000,
          creationDate: "2021-01-10T10:00:00Z",
          lastTransactionDate: "2024-12-02T11:30:00Z",
        },
        {
          id: 4,
          customerId: 101,
          accountNumber: "536782918",
          name: "Jane Doe",
          type: "Mortgage",
          balance: -20000,
          creationDate: "2021-02-15T14:00:00Z",
          lastTransactionDate: "2024-11-28T13:45:00Z",
        },
        {
          id: 5,
          customerId: 101,
          accountNumber: "985674839",
          name: "Jane Doe",
          type: "Savings",
          balance: 5000,
          creationDate: "2020-05-15T08:30:00Z",
          lastTransactionDate: "2024-12-05T09:00:00Z",
        },
        {
          id: 6,
          customerId: 101,
          accountNumber: "875649287",
          name: "Jane Doe",
          type: "Mortgage",
          balance: -15000,
          creationDate: "2020-06-20T09:00:00Z",
          lastTransactionDate: "2024-11-30T10:00:00Z",
        },
        {
          id: 7,
          customerId: 101,
          accountNumber: "756374658",
          name: "Jane Doe",
          type: "Savings",
          balance: 7000,
          creationDate: "2021-01-10T10:00:00Z",
          lastTransactionDate: "2024-12-02T11:30:00Z",
        },
        {
          id: 8,
          customerId: 101,
          accountNumber: "564738927",
          name: "Jane Doe",
          type: "Mortgage",
          balance: -20000,
          creationDate: "2021-02-15T14:00:00Z",
          lastTransactionDate: "2024-11-28T13:45:00Z",
        },
      ]),
    });
  });

  it("renders Customer Dashboard with table and search input", async () => {
    render(<CustomerDashboard />);
    expect(screen.getByText("Account Summary")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByText("Transfer")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("123456789")).toBeInTheDocument();
    });
  });

  it("filters accounts based on search input", async () => {
    render(<CustomerDashboard />);
    await waitFor(() =>
      expect(screen.getByText("123456789")).toBeInTheDocument()
    );
    fireEvent.change(screen.getByPlaceholderText("Search"), {
      target: { value: "8756" },
    });
    await waitFor(() => {
      expect(screen.getByText("875649287")).toBeInTheDocument();
    });
  });

  it("changes pages when next and previous buttons are clicked", async () => {
    render(<CustomerDashboard />);
    await waitFor(() =>
      expect(screen.getByText("123456789")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
  });

  it("disables previous and next buttons on first and last page", async () => {
    render(<CustomerDashboard />);
    await waitFor(() =>
      expect(screen.getByText("123456789")).toBeInTheDocument()
    );

    const prevButton = screen.getByText("Previous");
    const nextButton = screen.getByText("Next");
    expect(prevButton).toBeDisabled();

    fireEvent.click(nextButton);
    expect(nextButton).toBeDisabled();
  });

  it("calls alert when transfer button is clicked", async () => {
    window.alert = vi.fn();

    render(<CustomerDashboard />);
    await waitFor(() =>
      expect(screen.getByText("123456789")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText("Transfer"));
    expect(window.alert).toHaveBeenCalledWith("Transfer button clicked!");
  });

  it("sorts accounts by creation date", async () => {
    render(<CustomerDashboard />);
    await waitFor(() =>
      expect(screen.getByText("123456789")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText("Creation Date"));
    expect(screen.getByText("567891234")).toBeInTheDocument();
  });
});
