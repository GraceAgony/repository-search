import { Action, Repo, RootState } from "../../../types";

export enum ReposActionTypes {
  FETCH_REPOS_START = "FETCH_REPOS_START",
  FETCH_REPOS_SUCCESS = "FETCH_REPOS_SUCCESS",
  FETCH_REPOS_FAILURE = "FETCH_REPOS_FAILURE",
  SET_SEARCH_INPUT_VALUE = "SET_SEARCH_INPUT_VALUE",
}

export const fetchRepos = (searchInput: string, pageNumber: number) => (
  dispatch: any,
  getState: () => RootState
) => {
  const reposStore = getState().repositories.items;
  if (reposStore[searchInput]?.[pageNumber]) {
    dispatch(setCurrentSearchValue(searchInput));
    return;
  }
  dispatch(fetchReposStart);
  const url = new URL("https://api.github.com/search/repositories");
  url.searchParams.append("q", searchInput);
  url.searchParams.append("sort", "stars");
  url.searchParams.append("order", "desc");
  url.searchParams.append("page", `${pageNumber}`);
  url.searchParams.append("per_page", "30");

  fetch(url.href)
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(
        fetchReposSuccess(searchInput, pageNumber, res.items, res.total_count)
      );
    })
    .catch((error) => {
      dispatch(fetchReposFailure(error));
    });
};

export const fetchReposStart: Action<ReposActionTypes> = {
  type: ReposActionTypes.FETCH_REPOS_START,
};

export const fetchReposSuccess = (
  searchString: string,
  pageNumber: number,
  repos: Repo[],
  totalCount: number
): Action<ReposActionTypes> => ({
  type: ReposActionTypes.FETCH_REPOS_SUCCESS,
  payload: { searchString, pageNumber, repos, totalCount },
});

export const fetchReposFailure = (
  error: Error
): Action<ReposActionTypes, Error> => {
  return {
    type: ReposActionTypes.FETCH_REPOS_FAILURE,
    payload: error,
  };
};

export const setCurrentSearchValue = (
  searchString: string
): Action<ReposActionTypes> => ({
  type: ReposActionTypes.SET_SEARCH_INPUT_VALUE,
  payload: { searchString },
});
