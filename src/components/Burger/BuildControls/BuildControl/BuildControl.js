import React from "react";
import classes from "./BuildControl.module.css";
import PropTypes from "prop-types";

const buildControl = props => {
  //console.log("TCL: props", props);
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.less}
        onClick={props.remove}
        disabled={props.disabled}
      >
        Less
      </button>
      <button className={classes.More} onClick={props.more}>
        More
      </button>
    </div>
  );
};

buildControl.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  more: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
};

export default buildControl;
