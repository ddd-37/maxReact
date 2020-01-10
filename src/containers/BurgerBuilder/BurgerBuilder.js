import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "./../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSumary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "./../../components/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.4,
  cheese: 0.75,
  meat: 1.4,
  bacon: 0.96
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    purchasable: false,
    purchasing: false,
    totalPrice: 4,
    loading: false
  };

  // Get ingredient data from the backend
  componentDidMount() {
    axios
      .get("https://burger-time-2454e.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      });
  }

  // Runs on both addition and subtraction of items
  updatePurchaseState = updatedIngredients => {
    const sum = Object.keys(updatedIngredients)
      .map(igKey => {
        return updatedIngredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  };

  // Runs when order now is clicked
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  //METHODS TO ADD AND REMOVE INGREDIENTS
  addIngredientHandler = type => {
    // Add 1 to our selected ingredient
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;

    // Create are new state object essentially
    const updatedIngredients = {
      ...this.state.ingredients
    };

    // Edit the new state object
    updatedIngredients[type] = updatedCount;

    // Find the price for the new ingredient
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    //console.log("TCL: BurgerBuilder -> newPrice", newPrice);

    // Set the state
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });

    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    // Remove 1 from our selected ingredient
    const oldCount = this.state.ingredients[type];

    // We need to handle negative numbers, meaning we do not allow them
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;

    // Creates a new state object essentially
    const updatedIngredients = {
      ...this.state.ingredients
    };

    // Edit the new state object
    updatedIngredients[type] = updatedCount;

    // Find the price for the new ingredient
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceDeduction;

    // Set the state
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });

    this.updatePurchaseState(updatedIngredients);
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Devon Deason",
        address: {
          street: "Teststreet 1",
          zipCode: "80206",
          city: "Denver",
          state: "CO"
        },
        email: "devon.deason@gmail.com"
      },
      deliveryMethod: "fastest"
    };

    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  closeModalHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  render() {
    // We need to be able to disable buttons if the value of the ingredient is zero
    const disabledInfo = {
      ...this.state.ingredients // Copy our state object
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; // If the key is equal to or less than zero set the new disabledInfo object key: value to false
    }

    let orderSummary = null;

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    let burger = <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.state.ingredients} />{" "}
          <BuildControls
            price={this.state.totalPrice}
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          canceled={this.closeModalHandler}
          continued={this.purchaseContinueHandler}
          totalPrice={this.state.totalPrice}
        />
      );
    }

    return (
      <>
        {burger}

        <Modal
          show={this.state.purchasing}
          backdropClick={this.closeModalHandler}
        >
          {orderSummary}
        </Modal>
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
