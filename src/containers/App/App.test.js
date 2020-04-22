import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../reducers";
import "@testing-library/jest-dom";
import { getOrders, postOrder } from "../../apiCalls";
jest.mock("../../apiCalls");

const orders = [
  {
    id: 1,
    name: "Pete",
    ingredients: ["cheese", "lettuce"]
  },
  {
    id: 2,
    name: "Sam",
    ingredients: ["sofritas", "sour cream"]
  }
];

describe("Login Page", () => {
  it("Should render what we expect", () => {
    getOrders.mockResolvedValueOnce(orders);

    const store = createStore(rootReducer);
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(getByText("Burrito Builder")).toBeInTheDocument();
  });

  it("should be able to submit an order", async () => {
    const order = {
      id: 15,
      name: "Joe",
      ingredients: ["beans", "carnitas"]
    };

    getOrders.mockResolvedValueOnce(orders);
    postOrder.mockResolvedValueOnce(order);

    const store = createStore(rootReducer);
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const beansBtn = getByText("beans");
    const carnitasBtn = getByText("carnitas");
    const nameInput = getByPlaceholderText("Name");
    const submitBtn = getByText("Submit Order");
    fireEvent.change(nameInput, { target: { value: "Joe" } });
    fireEvent.click(beansBtn);
    fireEvent.click(carnitasBtn);
    fireEvent.click(submitBtn);
    const orderName = await waitFor(() => getByText("Joe"));
    const ingredient1 = await waitFor(() => getByTestId("beans-0"));
    const ingredient2 = await waitFor(() => getByTestId("carnitas-1"));
    expect(orderName).toBeInTheDocument();
    expect(ingredient1).toBeInTheDocument();
    expect(ingredient2).toBeInTheDocument();
  });
});
