import React from "react";
import { Repo } from "types";
import Star from "./StarIcon";

import "./RepoItem.scss";

interface RepoProps extends Repo {}

const RepoItem: React.FunctionComponent<RepoProps> = (props) => {
  return (
    <div className="c-repo-item">
      <a
        className="c-repo-item__name"
        href={props.html_url}
        rel="noopener noreferrer"
        target="_blank"
      >
        {props.name}
      </a>
      <div className="c-repo-item__description">{props.description}</div>
      <div className="c-repo-item__footer">
        <span className="c-repo-item__stars">
          <Star />
          {props.stargazers_count}
        </span>
        <span className="c-repo-item__language">{props.language}</span>
      </div>
    </div>
  );
};

export default RepoItem;
