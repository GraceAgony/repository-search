import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "react-loader-spinner";
import classnames from "classnames";

import {
  selectReposBySearchString,
  selectMaxPagesNumber,
  selectWereReposLoaded,
  selectSearchString,
} from "redux/modules/repos/reposSelectors";
import { fetchRepos } from "redux/modules/repos/reposActions";

import RepoItem from "components/RepoItem";

import { RootState } from "types";

import "./Paginator.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

interface PaginatorProps {}

const Paginator: React.FunctionComponent<PaginatorProps> = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const repositories = useSelector((state: RootState) =>
    selectReposBySearchString(state, currentPage)
  );
  const wereReposLoaded = useSelector(selectWereReposLoaded);
  const currentSearchInput = useSelector(selectSearchString);
  const numberOfPages = useSelector(selectMaxPagesNumber);

  const isPreviousButtonEnabled = currentPage > 1;
  const isNextButtonEnabled = currentPage < numberOfPages;

  let startPage = 1;
  if (numberOfPages > 4) {
    if (numberOfPages - currentPage > 2) {
      if (currentPage - 3 > 0) {
        startPage = currentPage - 2;
      }
    }
    startPage = numberOfPages - 4;
  }

  const goToPage = (pageNumber: number) => () => {
    setCurrentPage(pageNumber);
    dispatch(fetchRepos(currentSearchInput, pageNumber));
  };

  const Buttons = () => {
    let buttons = [];
    const endPage = numberOfPages > 4 ? 5 : numberOfPages;
    for (let i: number = 0; i < endPage; i++) {
      const currentPageNumber = startPage + i;
      buttons.push(
        <button
          className={classnames("c-paginator__pagination-button", {
            "c-paginator__pagination-button--active":
              currentPageNumber === currentPage,
          })}
          key={currentPageNumber}
          onClick={goToPage(currentPageNumber)}
        >
          {currentPageNumber}
        </button>
      );
    }
    return (
      <div className="c-paginator__pagination-buttons">
        {isPreviousButtonEnabled && (
          <button
            className="c-paginator__pagination-arrow-button"
            onClick={goToPage(currentPage - 1)}
          >
            {"<<"}
          </button>
        )}
        {buttons}
        {isNextButtonEnabled && (
          <button
            className="c-paginator__pagination-arrow-button"
            onClick={goToPage(currentPage + 1)}
          >
            >>
          </button>
        )}
      </div>
    );
  };

  return wereReposLoaded ? (
    <div className="c-paginator">
      {repositories?.length ? (
        <>
          <div className="repo-items-list">
            {repositories.map((repository) => (
              <RepoItem key={repository.id} {...repository}></RepoItem>
            ))}
          </div>
          <Buttons></Buttons>
        </>
      ) : (
        <div className="c-paginator__empty-result">There are no results</div>
      )}
    </div>
  ) : (
    <div className="c-paginator__loading">
      <Loader type="ThreeDots" color="#0366d6" height={50} width={50} />
    </div>
  );
};

export default Paginator;
