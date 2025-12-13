import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../Header";

describe("Header Component - LocalLens", () => {
  test("renders navigation links", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
  });
});
