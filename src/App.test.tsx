import React from "react";
import { render, cleanup } from "utils/test-utils";
import App from "./App";

afterEach(cleanup);

test("should write a snapshot", () => {
  const { container } = render(<App />);

  expect(container).toMatchSnapshot();
});
