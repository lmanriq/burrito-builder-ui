import * as actions from "../actions";

describe("Action Creators", () => {
  it("should have a type of SET_ORDERS and a correct payload", () => {
    const orders = [
      {
        id: 1,
        name: "Pat",
        ingredients: [
          "beans",
          "lettuce",
          "carnitas",
          "queso fresco",
          "jalapeno"
        ]
      },
      {
        id: 2,
        name: "Sue",
        ingredients: ["carnitas", "jalapeno"]
      }
    ];
    const expectedAction = {
      type: "SET_ORDERS",
      orders
    };
    const result = actions.setOrders(orders);
    expect(result).toEqual(expectedAction);
  });

  it("should have a type of ADD_ORDER and a correct payload", () => {
    const order = {
      id: 1,
      name: "Pat",
      ingredients: ["beans", "lettuce", "carnitas", "queso fresco", "jalapeno"]
    };
    const expectedAction = {
      type: "ADD_ORDER",
      order
    };
    const result = actions.addOrder(order);
    expect(result).toEqual(expectedAction);
  });
});
