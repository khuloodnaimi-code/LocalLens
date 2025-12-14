import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store";
import Login from "../Login";

describe("Login Component - LocalLens", () => {
  test("renders login page elements", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/local lens/i)).toBeInTheDocument();
    expect(screen.getByText(/get started/i)).toBeInTheDocument();
  });
});
