import React from "react";
import { Provider } from "react-redux";

import Main from "components/Main";
import store from "./redux/store";

import "./reset.css";

function App() {
  return (
    <Provider store={store}>
      <Main></Main>
    </Provider>
  );
}

export default App;
