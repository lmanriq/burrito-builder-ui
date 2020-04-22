import { orders } from "./orders";

describe("loginFlow", () => {
  it("should return the initial state", () => {
    const expectedResult = [];
    const result = orders(undefined, ["order"]);
    expect(result).toEqual(expectedResult);
  });
  it("when receiving SET_ORDERS action, it should return the orders array", () => {
    const sampleOrders = [
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
    const sampleAction = {
      type: "SET_ORDERS",
      orders: sampleOrders
    };
    const result = orders([], sampleAction);
    expect(result).toEqual(sampleOrders);
  });
  it("when receiving ADD_ORDER action, it should return the updated orders array", () => {
    const order1 = {
      id: 1,
      name: "Pat",
      ingredients: ["beans", "lettuce", "carnitas", "queso fresco", "jalapeno"]
    };
    const order2 = {
      id: 2,
      name: "Sue",
      ingredients: ["carnitas", "jalapeno"]
    };
    const sampleAction = {
      type: "ADD_ORDER",
      order: order2
    };
    const result = orders([order1], sampleAction);
    expect(result).toEqual([order1, order2]);
  });
});
