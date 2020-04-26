import { RootState } from "types";

export const selectReposBySearchString = (state: RootState, page: number = 1) =>
  state.repositories.items[state.repositories.currentSearchString]?.[page];

export const selectMaxPagesNumber = (state: RootState) => {
  const totalCount =
    state.repositories.items[state.repositories.currentSearchString]
      ?.totalCount;
  return totalCount >= 1000 ? 34 : Math.round(totalCount / 30);
};

export const selectWereReposLoaded = (state: RootState) =>
  !state.repositories.loading;

export const selectError = (state: RootState) => state.repositories.error;

export const selectSearchString = (state: RootState) =>
  state.repositories.currentSearchString;
