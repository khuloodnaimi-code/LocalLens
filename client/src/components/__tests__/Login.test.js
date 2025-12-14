import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { createMockStore, userInitialState, routerFutureFlags } from "./testHelpers";
import userReducer from "../../features/UserSlice";
import Login from "../Login";

describe("Login Component - LocalLens", () => {
  test("matches the Login snapshot", () => {
    const { container } = render(
      <Provider store={createMockStore()}>
        <MemoryRouter future={routerFutureFlags}>
          <Login />
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
