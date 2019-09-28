import React from "react";
import classes from "./SideDrawerToggle.module.css";
import PropTypes from "prop-types";

const sideDrawerToggle = props => (
  <div className={classes.SideDrawerToggle} onClick={props.click}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

sideDrawerToggle.propTypes = {
  click: PropTypes.func.isRequired
};

export default sideDrawerToggle;
