import React from "react";
import { render, cleanup, fireEvent } from "../../utils/test-utils";
import Search from "./Search";

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
  const { container } = render(<Search />);

  expect(container).toMatchSnapshot();
});

test("fetch data on search button click", () => {
  const utils = render(<Search />);
  const input = utils.getByLabelText("search-input");
  fireEvent.change(input, { target: { value: "23" } });
  expect(input.value).toBe("23");
  fireEvent.click(utils.container.querySelector("svg"));
  expect(mockedFetch).toHaveBeenCalledWith(
    "https://api.github.com/search/repositories?q=23&sort=stars&order=desc&page=1&per_page=30"
  );
});

test("fetch data on enter key click", () => {
  const utils = render(<Search />);
  const input = utils.getByLabelText("search-input");
  fireEvent.change(input, { target: { value: "21" } });
  expect(input.value).toBe("21");
  fireEvent.keyUp(window, { keyCode: "13" });
  expect(mockedFetch).toHaveBeenCalledWith(
    "https://api.github.com/search/repositories?q=21&sort=stars&order=desc&page=1&per_page=30"
  );
});

test("doesn't fetch data on non-enter key click", () => {
  render(<Search />);
  fireEvent.keyUp(window, { keyCode: "1" });
  expect(mockedFetch).not.toHaveBeenCalled();
});
