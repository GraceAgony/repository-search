import React from "react";

import Search from "./components/Search";

import octocat from "./images/Octocat.png";
import "./App.scss";
import "./reset.css";

function App() {
  return (
    <div className="c-app">
      <img src={octocat} alt="github logo" className="c-app__logo" />
      <Search></Search>
    </div>
  );
}

export default App;
