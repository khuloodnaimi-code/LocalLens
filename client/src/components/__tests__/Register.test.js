import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "../Register";

describe("Register component - LocalLens", () => {
  test("renders register page", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });
});
