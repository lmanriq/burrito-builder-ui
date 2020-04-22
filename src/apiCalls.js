export const getOrders = () => {
  return fetch("http://localhost:3001/api/v1/orders").then(response =>
    response.json()
  );
};

export const postOrder = order => {
  return fetch("http://localhost:3001/api/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  }).then(response => response.json());
};


export const sendDeleteRequest = id => {
  return fetch(`http://localhost:3001/api/v1/orders/${id}`, {
    method: "DELETE"
  }).then(response => response.status);
}