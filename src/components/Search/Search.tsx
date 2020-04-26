import React, { ChangeEvent, useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import SearchIcon from "./SearchIcon";

import "./Search.scss";
import { fetchRepos } from "redux/modules/repos/reposActions";

interface SearchProps {}

const Search: React.FunctionComponent<SearchProps> = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchRepos(inputValue, 1));
  };

  const handleEnter = useCallback(
    (event: KeyboardEvent) => {
      if (event.keyCode === 13) {
        dispatch(fetchRepos(inputValue, 1));
      }
    },
    [dispatch, inputValue]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    window.addEventListener("keyup", handleEnter);
    return () => window.removeEventListener("keyup", handleEnter);
  }, [handleEnter]);

  return (
    <div className="c-search">
      <input
        className="c-search__input"
        type="search"
        placeholder="Search"
        onChange={handleChange}
      ></input>
      <button className="c-search__button">
        <SearchIcon onClick={handleClick} />
      </button>
    </div>
  );
};

export default Search;
