import {
  ReposActionTypes,
  fetchReposFailure,
  fetchReposSuccess,
  fetchRepos,
  fetchReposStart,
  setCurrentSearchValue,
} from "./reposActions";
import { Repo } from "types";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

const mockedFetch = jest.fn(() =>
  Promise.resolve({
    json: () => ({ items: [] }),
  })
);

beforeEach(() => {
  global.fetch = mockedFetch;
});

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  jest.resetAllMocks();
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test("should create an action to set current search value", () => {
  const searchString = "some search";
  const expectedAction = {
    type: ReposActionTypes.SET_SEARCH_INPUT_VALUE,
    payload: { searchString },
  };
  expect(setCurrentSearchValue(searchString)).toEqual(expectedAction);
});

test("should create an action to indicate that fetch repos started", () => {
  const expectedAction = {
    type: ReposActionTypes.FETCH_REPOS_START,
  };
  expect(fetchReposStart).toEqual(expectedAction);
});

test("should create an action to indicate that fetch repos succeed", () => {
  const searchString = "someSearch";
  const pageNumber = 4;
  const repos = [{} as Repo];
  const totalCount = 43;

  const expectedAction = {
    type: ReposActionTypes.FETCH_REPOS_SUCCESS,
    payload: { searchString, pageNumber, repos, totalCount },
  };
  expect(
    fetchReposSuccess(searchString, pageNumber, repos, totalCount)
  ).toEqual(expectedAction);
});

test("should fetch repos, if there are no results for such search input", () => {
  const searchInput = "search";
  const pageNumber = 4;
  const store = mockStore({ repositories: { items: {} } });
  store.dispatch(fetchRepos(searchInput, pageNumber)).then(() =>
    expect(store.getActions()).toEqual([
      {
        type: ReposActionTypes.FETCH_REPOS_START,
      },
      {
        payload: {
          pageNumber: 4,
          repos: [],
          searchString: "search",
          totalCount: undefined,
        },
        type: "FETCH_REPOS_SUCCESS",
      },
    ])
  );
});

test("should not fetch repos, if there are no results for such search input", () => {
  const searchInput = "search";
  const pageNumber = 4;
  const store = mockStore({
    repositories: { items: { [searchInput]: { [pageNumber]: [{}] } } },
  });
  store.dispatch(fetchRepos(searchInput, pageNumber));
  expect(store.getActions()).toEqual([
    {
      type: ReposActionTypes.SET_SEARCH_INPUT_VALUE,
      payload: { searchString: searchInput },
    },
  ]);
});

test("should not call fetchReposFailure if there are some error", () => {
  const searchInput = "search";
  const pageNumber = 4;
  const err = new Error("some error");
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => ({
        error: err,
      }),
    })
  );
  const store = mockStore({
    repositories: { items: {} },
  });
  store
    .dispatch(fetchRepos(searchInput, pageNumber))
    .then(() =>
      expect(store.getActions()).toEqual([
        { type: "FETCH_REPOS_START" },
        { payload: err, type: "FETCH_REPOS_FAILURE" },
      ])
    );
});
