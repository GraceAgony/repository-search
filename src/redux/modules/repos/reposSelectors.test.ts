import {
  selectMaxPagesNumber,
  selectReposBySearchString,
} from "./reposSelectors";
import { RootState, Repo } from "types";

test("should return 34 if number of results is more than 1000 ", () => {
  const state: RootState = {
    repositories: {
      items: { search: { totalCount: 3000 } },
      currentSearchString: "search",
      loading: false,
      error: null,
    },
  };
  expect(selectMaxPagesNumber(state)).toEqual(34);
});

test("should correct page numbers if number of results is less than 1000 ", () => {
  const state: RootState = {
    repositories: {
      items: { search: { totalCount: 31 } },
      currentSearchString: "search",
      loading: false,
      error: null,
    },
  };
  expect(selectMaxPagesNumber(state)).toEqual(2);
});

test("should return repositories for passed search string and page number", () => {
  const repos: Repo[] = [];
  const state: RootState = {
    repositories: {
      items: { search: { totalCount: 31, "2": repos } },
      currentSearchString: "search",
      loading: false,
      error: null,
    },
  };
  expect(selectReposBySearchString(state, 2)).toEqual(repos);
});

test("should return repositories for passed search string and 1 page, if page value wasn't passed", () => {
  const repos: Repo[] = [];
  const state: RootState = {
    repositories: {
      items: { search: { totalCount: 31, "1": repos } },
      currentSearchString: "search",
      loading: false,
      error: null,
    },
  };
  expect(selectReposBySearchString(state)).toEqual(repos);
});
