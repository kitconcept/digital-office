import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders username", () => {
  render(<App />);
  const linkElement = screen.getByText(/Join Office/i);
  expect(linkElement).toBeInTheDocument();
});
