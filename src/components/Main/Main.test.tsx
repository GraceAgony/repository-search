import React from "react";
import { render, cleanup, screen } from "../../utils/test-utils";
import Main from "./Main";

afterEach(cleanup);

test("should write a snapshot", () => {
  const { container } = render(<Main />);

  expect(container).toMatchSnapshot();
});

test("render error message when error in redux store", () => {
  render(<Main />, {
    initialState: {
      repositories: {
        error: new Error("error msg"),
        loading: false,
        items: {},
        currentSearchString: "some search",
      },
    },
  });
  expect(screen.getByText("Error: error msg")).toBeVisible();
});

test("render Paginator when repositories loading", () => {
  const { container } = render(<Main />, {
    initialState: {
      repositories: {
        error: null,
        loading: true,
        items: {},
        currentSearchString: "some search",
      },
    },
  });
  expect(container.querySelector(".c-paginator__loading")).toBeVisible();
});
