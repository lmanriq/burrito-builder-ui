import React, { Component } from 'react';
import { postOrder } from '../../apiCalls';
import { connect } from 'react-redux';
import { addOrder } from '../../actions';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      error: ''
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleIngredientChange = e => {
    e.preventDefault();
    const { ingredients } = this.state;
    const existingIngredients = ingredients.filter(ingredient => ingredient === e.target.name);
    if (existingIngredients.length < 2) {
      this.setState({ingredients: [...ingredients, e.target.name]});
    } else {
      this.setState({error: 'You can have a maximum of 2 of each ingredient'});
      setTimeout(() => {
        this.setState({
          error: ''
        });
      }, 3000);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    postOrder({...this.state})
      .then(data => this.props.addOrder(data))
      .catch(err => console.error(err.message))
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    const { name, ingredients, error } = this.state;
    const isDisabled = ingredients.length === 0 || name === '' ? true : false;

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { ingredients.join(', ') || 'Nothing selected' }</p>
        {error && <p>{error}</p>}
        <button onClick={e => this.handleSubmit(e)} disabled={isDisabled}>
          Submit Order
        </button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addOrder: order => dispatch(addOrder(order))
})
export default connect(null, mapDispatchToProps)(OrderForm);