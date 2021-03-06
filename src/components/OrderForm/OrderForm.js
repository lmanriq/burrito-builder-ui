import React, { Component } from "react";
import { postOrder } from "../../apiCalls";
import { connect } from "react-redux";
import { addOrder } from "../../actions";

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: "",
      ingredients: [],
      error: "",
      orderTotal: 5
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleIngredientChange = e => {
    e.preventDefault();
    const { ingredients } = this.state;
    const existingIngredients = ingredients.filter(
      ingredient => ingredient === e.target.name
    );
    if (existingIngredients.length < 2) {
      let currentTotal = this.state.orderTotal;
      this.setState({orderTotal: currentTotal += parseFloat(e.target.value)})
      this.setState({ ingredients: [...ingredients, e.target.name] });
    } else {
      this.setState({
        error: "You can have a maximum of 2 of each ingredient"
      });
      setTimeout(() => {
        this.setState({
          error: ""
        });
      }, 3000);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const {name, ingredients, orderTotal } = this.state;
    const newOrder = {
      name,
      ingredients,
      orderTotal
    }
    postOrder(newOrder)
      .then(data => this.props.addOrder(data))
      .catch(err => console.error(err.message));
    this.clearInputs();
  };

  clearInputs = () => {
    this.setState({ name: "", ingredients: [], orderTotal: 5 });
  };

  render() {
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
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button
          key={ingredient.name}
          name={ingredient.name}
          value={ingredient.price}
          onClick={e => this.handleIngredientChange(e)}
        >
          {ingredient.name}
        </button>
      );
    });

    const { name, ingredients, error, orderTotal } = this.state;
    const isDisabled = ingredients.length === 0 || name === "" ? true : false;

    return (
      <form>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={e => this.handleNameChange(e)}
        />

        {ingredientButtons}

        <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>
        <p>Order total: ${orderTotal}</p>
        {error && <p>{error}</p>}
        <button onClick={e => this.handleSubmit(e)} disabled={isDisabled}>
          Submit Order
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addOrder: order => dispatch(addOrder(order))
});
export default connect(null, mapDispatchToProps)(OrderForm);
