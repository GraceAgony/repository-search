export interface ReposState {
  items: ReposBySearch;
  loading: boolean;
  error: Error | null;
  currentSearchString: string;
}

export type RootState = { repositories: ReposState };

export type Action<T = string, P = any> = {
  payload?: P;
  type: T;
};

export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  language: string;
}

export interface ReposBySearch {
  [searchString: string]: { totalCount: number; [pageNumber: number]: Repo[] };
}
