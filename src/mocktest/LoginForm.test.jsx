// LoginForm.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm"; // 替换为你的实际路径

describe("LoginForm", () => {
  test("renders form inputs and login button", () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("calls onSubmit with user credentials", () => {
    const mockLogin = jest.fn();
    render(<LoginForm onLogin={mockLogin} />);
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "member1" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(mockLogin).toHaveBeenCalledWith({ username: "member1", password: "123456" });
  });
});
