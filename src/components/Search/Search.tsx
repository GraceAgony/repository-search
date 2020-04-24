import React, { ChangeEvent, useState } from "react";

import SearchIcon from "./SearchIcon";

import "./Search.scss";

interface SearchProps {}

const Search: React.FunctionComponent<SearchProps> = (props) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    console.log(inputValue);
  };

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
