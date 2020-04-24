import { ReposActionTypes } from "./reposActions";
import { Action, ReposState } from "../../../types";

const initialState: ReposState = {
  items: {},
  loading: false,
  error: null,
};

export default function reposReducer(
  state: ReposState = initialState,
  action: Action<ReposActionTypes, any>
) {
  switch (action.type) {
    case ReposActionTypes.FETCH_REPOS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ReposActionTypes.FETCH_REPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: {
          ...state.items,
          [action.payload.searchString]: action.payload.repos,
        },
      };

    case ReposActionTypes.FETCH_REPOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: [],
      };

    default:
      return state;
  }
}
