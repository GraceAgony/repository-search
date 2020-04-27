import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { rootReducer } from "./../redux/store";
import { initialState as reducerInitialState } from "./../redux/modules/repos/reposReducer";

function render(
  ui: JSX.Element,
  {
    initialState = { repositories: reducerInitialState },
    store = createStore(rootReducer, initialState, applyMiddleware(thunk)),
    ...renderOptions
  }: { initialState?: any; store?: any } = {}
) {
  function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from "@testing-library/react";
export { render };
