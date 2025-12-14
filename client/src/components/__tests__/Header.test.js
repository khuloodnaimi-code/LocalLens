import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store";
import Header from "../Header";

describe("Header Component - LocalLens", () => {
  test("renders navigation links", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
  });
});
