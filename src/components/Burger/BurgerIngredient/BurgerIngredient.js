import React from "react";
import classes from "./BurgerIngredient.css";
import PropTypes from "prop-types";

const burgerIngredient = props => {
  let ingredient = null;

  // Use a switch statement to analyze the ingredits comming in
  switch (props.type) {
    case "bread-bottom":
      ingredient = <div className={classes.BreadBottom}></div>;
      break;
    case "bread-top":
      ingredient = (
        <div classname={classes.BreakTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case "meat":
      ingredient = <div classname={classes.Meat}></div>;
      break;
    case "cheese":
      ingredient = <div classname={classes.Cheese}></div>;
      break;
    case "Salad":
      ingredient = <div classname={classes.Salad}></div>;
      break;
    case "bacon":
      ingredient = <div classname={classes.Bacon}></div>;
      break;
    default:
      ingredient = null;
      break;
  }

  return ingredient;
};

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default burgerIngredient;
