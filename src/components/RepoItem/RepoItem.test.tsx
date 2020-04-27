import React from "react";
import { render, cleanup } from "../../utils/test-utils";
import RepoItem from "./RepoItem";

afterEach(cleanup);

test("should write a snapshot", () => {
  const mockRepo = {
    id: 2323,
    name: "mockRepo",
    description: "mockRepo description",
    html_url: "fake url",
    language: "Elvish",
    stargazers_count: 100000,
  };
  const { container } = render(<RepoItem {...mockRepo} />);

  expect(container).toMatchSnapshot();
});
