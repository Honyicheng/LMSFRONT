
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AdminLoanPage from "./AdminLoanPage";
import axiosInstance from "../../utils/Axios";

// 🧪 mock axios
jest.mock("../../utils/Axios");

describe("AdminLoanPage", () => {
  const mockLoans = [
    {
      id: 1,
      userid: 101,
      username: "member1",
      bookId: "B001",
      borrowDate: "2025-07-10",
      dueDate: "2025-07-24",
      fine: 0,
      returned: false
    }
  ];

  beforeEach(() => {
    axiosInstance.get.mockResolvedValue({ data: mockLoans });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loan table with data", async () => {
    render(<AdminLoanPage />);

    // loading message first
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // wait until data is loaded
    await waitFor(() => {
      expect(screen.getByText("Loan Records")).toBeInTheDocument();
      expect(screen.getByText("member1")).toBeInTheDocument();
      expect(screen.getByText("Borrowed")).toBeInTheDocument();
    });
  });

  it("calls delete API on delete click", async () => {
    axiosInstance.delete.mockResolvedValue({});

    render(<AdminLoanPage />);

    await waitFor(() => screen.getByText("member1"));

    // mock confirm dialog
    window.confirm = jest.fn(() => true);

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(axiosInstance.delete).toHaveBeenCalledWith("/api/admin/loans/1");
    });
  });

  it("calls extend API on extend click", async () => {
    axiosInstance.put.mockResolvedValue({});
    render(<AdminLoanPage />);

    await waitFor(() => screen.getByText("member1"));

    const extendBtn = screen.getByText("Extend");
    fireEvent.click(extendBtn);

    await waitFor(() => {
      expect(axiosInstance.put).toHaveBeenCalledWith("/api/admin/loans/1/extend");
    });
  });

  it("shows error if fetch fails", async () => {
    axiosInstance.get.mockRejectedValue(new Error("Fetch failed"));
    render(<AdminLoanPage />);

    await waitFor(() => {
      expect(screen.getByText("Failed to load loan records.")).toBeInTheDocument();
    });
  });
});
