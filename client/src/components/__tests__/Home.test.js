import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { createMockStore, userInitialState, routerFutureFlags } from "./testHelpers";
import userReducer from "../../features/UserSlice";
import HomePage from "../HomePage";

describe("Home Page - LocalLens", () => {
  test("matches the HomePage snapshot", () => {
    const { container } = render(
      <Provider store={createMockStore()}>
        <MemoryRouter future={routerFutureFlags}>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  test("uses the users initial state", () => {
    expect(userReducer(undefined, { type: undefined })).toEqual(
      userInitialState
    );
  });
});
