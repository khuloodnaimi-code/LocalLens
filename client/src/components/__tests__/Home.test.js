import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store";
import HomePage from "../HomePage";

describe("Home Page - LocalLens", () => {
  test("renders home page content", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/local/i)).toBeInTheDocument();
  });
});
