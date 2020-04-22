import React from "react";
import { render, fireEvent } from "@testing-library/react";
import OrderForm from "./OrderForm";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../reducers";
import "@testing-library/jest-dom";

describe("Order Form", () => {
  it("should render what we expect", () => {
    const store = createStore(rootReducer);
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <OrderForm />
      </Provider>
    );
    const possibleIngredients = [
      { name: "beans ($1)", price: 1 },
      { name: "steak ($2)", price: 2 },
      { name: "carnitas ($2)", price: 2 },
      { name: "sofritas ($2)", price: 2 },
      { name: "lettuce ($0.50)", price: 0.5 },
      { name: "queso fresco ($0.50)", price: 0.5 },
      { name: "pico de gallo ($0.50)", price: 0.5 },
      { name: "hot sauce ($0.50)", price: 0.5 },
      { name: "guacamole ($2)", price: 2 },
      { name: "jalapenos ($0.50)", price: 0.5 },
      { name: "cilantro ($0.50)", price: 0.5 },
      { name: "sour cream ($0.50)", price: 0.5 }
    ];
    expect(getByText("Order: Nothing selected")).toBeInTheDocument();
    expect(getByText("Submit Order")).toBeInTheDocument();
    possibleIngredients.forEach(ingredient => {
      expect(getByText(ingredient.name)).toBeInTheDocument();
    });
    expect(getByPlaceholderText("Name")).toBeInTheDocument();
  });

  it("should be able to add a name", () => {
    const store = createStore(rootReducer);
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <OrderForm />
      </Provider>
    );
    const nameInput = getByPlaceholderText("Name");
    fireEvent.change(nameInput, { target: { value: "Lili" } });
    expect(nameInput.value).toBe("Lili");
  });

  it("should be able to add ingredients", () => {
    const store = createStore(rootReducer);
    const { getByText } = render(
      <Provider store={store}>
        <OrderForm />
      </Provider>
    );
    const beansBtn = getByText("beans ($1)");
    const carnitasBtn = getByText("carnitas ($2)");
    fireEvent.click(beansBtn);
    fireEvent.click(carnitasBtn);
    expect(getByText("Order: beans ($1), carnitas ($2)")).toBeInTheDocument();
  });
  
  it("should only be able to add 2 of the same ingredient", () => {
    const store = createStore(rootReducer);
    const { getByText } = render(
      <Provider store={store}>
        <OrderForm />
      </Provider>
    );
    const beansBtn = getByText("beans ($1)");
    fireEvent.click(beansBtn);
    fireEvent.click(beansBtn);
    fireEvent.click(beansBtn);
    expect(getByText("You can have a maximum of 2 of each ingredient")).toBeInTheDocument();
  });

  it("should show an order total", () => {
    const store = createStore(rootReducer);
    const { getByText } = render(
      <Provider store={store}>
        <OrderForm />
      </Provider>
    );
    const beansBtn = getByText("beans ($1)");
    const carnitasBtn = getByText("carnitas ($2)");
    fireEvent.click(beansBtn);
    fireEvent.click(carnitasBtn);
    expect(getByText("Order total: $8")).toBeInTheDocument();
  });
});
