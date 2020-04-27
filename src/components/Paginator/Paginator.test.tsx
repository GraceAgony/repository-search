import React from "react";
import { render, cleanup, screen, fireEvent } from "../../utils/test-utils";
import Paginator from "./Paginator";

const mockedFetch = jest.fn(() => Promise.resolve(""));

beforeEach(() => {
  global.fetch = mockedFetch;
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

afterAll(() => {
  jest.resetAllMocks();
});

test("should write a snapshot", () => {
  const { container } = render(<Paginator />);
  expect(container).toMatchSnapshot();
});

test("should render correct  number of pages", () => {
  render(<Paginator />, {
    initialState: {
      repositories: {
        error: null,
        loading: false,
        items: { "some search": { totalCount: 68, "1": [{ id: 23232 }] } },
        currentSearchString: "some search",
      },
    },
  });
  expect(screen.queryByText("1")).toBeVisible();
  expect(screen.queryByText("2")).toBeVisible();
  expect(screen.queryByText("3")).toBeVisible();
  expect(screen.queryByText("4")).toBeNull();
});

test("should render correct 1 page if number of results <= 30", () => {
  render(<Paginator />, {
    initialState: {
      repositories: {
        error: null,
        loading: false,
        items: { "some search": { totalCount: 26, "1": [{ id: 23232 }] } },
        currentSearchString: "some search",
      },
    },
  });
  expect(screen.queryByText("1")).toBeVisible();
  expect(screen.queryByText("2")).toBeNull();
});

test("should render correct 5 pagination buttons if number of pages >= 5", () => {
  render(<Paginator />, {
    initialState: {
      repositories: {
        error: null,
        loading: false,
        items: { "some search": { totalCount: 800, "1": [{ id: 23232 }] } },
        currentSearchString: "some search",
      },
    },
  });

  expect(screen.queryByText("5")).toBeVisible();
});

test("should fetch data on pagination button clicked", () => {
  const utils = render(<Paginator />, {
    initialState: {
      repositories: {
        error: null,
        loading: false,
        items: { "some search": { totalCount: 800, "1": [{ id: 23232 }] } },
        currentSearchString: "some search",
      },
    },
  });
  fireEvent.click(utils.getByText("4"));
  expect(mockedFetch).toHaveBeenCalledWith(
    "https://api.github.com/search/repositories?q=some+search&sort=stars&order=desc&page=4&per_page=30"
  );
});
