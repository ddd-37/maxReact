import React, { Component } from "react";
import axios from "../../../axios-orders";

import Button from "./../../../components/UI/Button/Button";
import Spinner from "./../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Your Name" },
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Street name" },
        value: ""
      },
      zipCode: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Zip Code" },
        value: ""
      },
      city: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "City" },
        value: ""
      },
      state: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "State" },
        value: ""
      },
      email: {
        elementType: "email",
        elementConfig: { type: "text", placeholder: "Your email" },
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        }
      }
    },

    loading: false
  };

  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,

      deliveryMethod: "fastest"
    };

    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  inputChangedHandler = (e, inputIdentifier) => {
    console.log(e.target.value, inputIdentifier);

    // Weneed to make some deep clones here so we're not mutating the state directly
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = e.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    this.setState({
      orderForm: updatedOrderForm
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form>
        {formElementsArray.map(formElement => (
          <Input
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            key={formElement.id}
            changed={e => this.inputChangedHandler(e, formElement.id)}
          />
        ))}

        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
