import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "meat", type: "meat" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    {controls.map(el => {
      console.log("TCL: el", el);
      console.log("TCL: props", props);
      return (
        <BuildControl
          key={el.label}
          label={el.label}
          more={() => props.addIngredient(el.type)}
          remove={() => props.removeIngredient(el.type)}
          disabled={props.disabled[el.type]}
        />
      );
    })}
  </div>
);

export default buildControls;
