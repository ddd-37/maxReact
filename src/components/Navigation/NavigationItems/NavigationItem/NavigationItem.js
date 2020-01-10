import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.module.css";

import PropTypes from "prop-types";

const navigationItem = props => (
  <li className={classes.NavigationItem}>
    <NavLink to={props.link} activeClassName={classes.active} exact>
      {props.children}
    </NavLink>
  </li>
);

navigationItem.propTypes = {
  link: PropTypes.string.isRequired
};

export default navigationItem;
