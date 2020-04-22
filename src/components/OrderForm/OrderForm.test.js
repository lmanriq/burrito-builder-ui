import React from "react";
import { render } from "@testing-library/react";
import OrderForm from "./OrderForm";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../reducers";
import '@testing-library/jest-dom';

describe("Login Page", () => {
  it("Should render what we expect", () => {
    const store = createStore(rootReducer);
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <OrderForm />
      </Provider>
    );
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream']
    expect(getByText("Order: Nothing selected")).toBeInTheDocument();
    expect(getByText("Submit Order")).toBeInTheDocument();
    possibleIngredients.forEach(ingredient => {
      expect(getByText(ingredient)).toBeInTheDocument();
    })
    expect(getByPlaceholderText("Name")).toBeInTheDocument();
  });
});