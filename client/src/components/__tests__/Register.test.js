import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store";
import Register from "../Register";

describe("Register Component - LocalLens", () => {
  test("renders register page", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });
});
