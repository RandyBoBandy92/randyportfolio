import { render, screen } from "@testing-library/react";
import App from "./App";

it("does something", () => {
  render(<App />);
  const linkElement = screen.getByText(/yooo/i);
  expect(linkElement).toBeInTheDocument();
});
