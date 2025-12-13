import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../HomePage";

describe("Home Page - LocalLens", () => {
  test("renders home content", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/local/i)).toBeInTheDocument();
  });
});
