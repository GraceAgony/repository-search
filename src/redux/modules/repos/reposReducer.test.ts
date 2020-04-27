import reducer, { initialState } from "./reposReducer";
import { ReposActionTypes } from "./reposActions";

test("should handle FETCH_REPOS_SUCCESS", () => {
  expect(
    reducer(initialState, {
      type: ReposActionTypes.FETCH_REPOS_SUCCESS,
      payload: {
        searchString: "search",
        totalCount: 300,
        repos: [{ id: 3344 }],
        pageNumber: 3,
      },
    })
  ).toEqual({
    currentSearchString: "search",
    error: null,
    items: { search: { "3": [{ id: 3344 }], totalCount: 300 } },
    loading: false,
  });
});

test("should handle SET_SEARCH_INPUT_VALUE", () => {
  expect(
    reducer(initialState, {
      type: ReposActionTypes.SET_SEARCH_INPUT_VALUE,
      payload: {
        searchString: "search2",
      },
    })
  ).toEqual({
    currentSearchString: "search2",
    error: null,
    items: {},
    loading: false,
  });
});

test("should handle FETCH_REPOS_FAILURE", () => {
  const error = new Error("some error");
  expect(
    reducer(initialState, {
      type: ReposActionTypes.FETCH_REPOS_FAILURE,
      payload: error,
    })
  ).toEqual({
    currentSearchString: "",
    error,
    items: {},
    loading: false,
  });
});

test("should handle FETCH_REPOS_START", () => {
  expect(
    reducer(initialState, {
      type: ReposActionTypes.FETCH_REPOS_START,
    })
  ).toEqual({
    currentSearchString: "",
    error: null,
    items: {},
    loading: true,
  });
});
