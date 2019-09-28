import React from "react";
import Button from "../../UI/Button/Button";
import PropTypes from "prop-types";

const orderSummary = props => {
  console.log("TCL: orderSummary", props);
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span> :
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.totalPrice}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.canceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.continued}>
        CONTINUE
      </Button>
    </>
  );
};

orderSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  canceled: PropTypes.func.isRequired,
  continued: PropTypes.func.isRequired
};

export default orderSummary;
