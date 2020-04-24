import React from "react";
import { Provider } from "react-redux";

import Search from "./components/Search";
import octocat from "./images/Octocat.png";
import store from "./redux/store";

import "./App.scss";
import "./reset.css";

function App() {
  return (
    <Provider store={store}>
      <div className="c-app">
        <img src={octocat} alt="github logo" className="c-app__logo" />
        <Search></Search>
      </div>
    </Provider>
  );
}

export default App;
