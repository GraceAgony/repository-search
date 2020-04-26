import * as React from "react";
import { useSelector } from "react-redux";

import Search from "../Search";
import Paginator from "components/Paginator";

import octocat from "../../images/Octocat.png";
import {
  selectSearchString,
  selectWereReposLoaded,
} from "redux/modules/repos/reposSelectors";

import "./Main.scss";

interface MainProps {}

const Main: React.FunctionComponent<MainProps> = (props) => {
  const isSearchString = useSelector(selectSearchString);
  const isLoading = !useSelector(selectWereReposLoaded);

  return (
    <div className="c-app">
      <div className="c-app__head">
        <img src={octocat} alt="github logo" className="c-app__logo" />
        <Search></Search>
      </div>
      {isLoading || isSearchString ? (
        <Paginator></Paginator>
      ) : (
        <div className="c-app__empty-search">
          Enter the name of the repository you want to find
        </div>
      )}
    </div>
  );
};

export default Main;
