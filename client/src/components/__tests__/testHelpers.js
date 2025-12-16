import configureMockStore from "redux-mock-store";

export const userInitialState = {
  user: {},
  message: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const postInitialState = {
  posts: [],
  message: "",
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const createMockStore = () => {
  const mockStore = configureMockStore([]);
  return mockStore({ users: userInitialState, posts: postInitialState });
};

export const routerFutureFlags = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

// Minimal placeholder test to satisfy Jest
describe("testHelpers", () => {
  test("placeholder runs", () => {
    expect(true).toBe(true);
  });
});
