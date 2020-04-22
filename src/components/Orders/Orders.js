import React, { Component } from "react";
import "./Orders.css";
import { connect } from "react-redux";
import { setOrders } from "../../actions";
import { getOrders, sendDeleteRequest } from "../../apiCalls";

class Orders extends Component {
  componentDidMount() {
    getOrders()
      .then(data => this.props.setOrders(data.orders))
      .catch(err => console.error("Error fetching:", err));
  }

  deleteOrder(id) {
    sendDeleteRequest(id).catch(err => console.error("Error deleting: ", err));
    const filteredOrders = this.props.orders.filter(order => order.id !== id);
    this.props.setOrders(filteredOrders);
  }

  render() {
    const { orders } = this.props;
    const orderEls = orders.map((order, index) => {
      return (
        <div key={index} className="order">
          <h3>{order.name}</h3>
          <ul className="ingredient-list">
            {order.ingredients.map((ingredient, index) => {
              return (
                <li key={index} data-testid={`${ingredient}-${index}`}>
                  {ingredient}
                </li>
              );
            })}
          </ul>
          <button onClick={() => this.deleteOrder(order.id)}>delete</button>
        </div>
      );
    });

    return (
      <section>{orderEls.length ? orderEls : <p>No orders yet!</p>}</section>
    );
  }
}

const mapStateToProps = ({ orders }) => ({
  orders
});

const mapDispatchToProps = dispatch => ({
  setOrders: orders => dispatch(setOrders(orders))
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
