import renderer from "react-test-renderer";
import Login from "../Login";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
const store = mockStore({
  users: { isSuccess: false, isError: false, user: null },
});

test("matches the UI snapshot with screen.debug()", () => {
  const { container } = render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );

  screen.debug(container);
  expect(container).toMatchSnapshot();
});

test("validates email format using regex", () => {
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );

  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, {
    target: { value: "valid.email@example.com" },
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  expect(emailRegex.test(emailInput.value)).toBe(true);

  fireEvent.change(emailInput, { target: { value: "invalid-email" } });
  expect(emailRegex.test(emailInput.value)).toBe(false);
});

test("validates password format using regex", () => {
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );

  const passwordInput = screen.getByLabelText(/password/i);
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

  fireEvent.change(passwordInput, { target: { value: "Abc@123" } });
  expect(passwordRegex.test(passwordInput.value)).toBe(true);
});

const initval1 = {
  user: {},
  isSuccess: false,
  isError: false,
  isLoading: false,
};
test("Should return initial state", () => {
  expect(
    reducer(undefined, {
      type: undefined,
    })
  ).toEqual(initval1);
});
