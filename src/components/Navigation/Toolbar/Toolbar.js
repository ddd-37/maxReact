import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Layout/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems.js";
import SideDrawerToggle from "../SideDrawer/SideDrawerToggle/SideDrawerToggle";
import PropTypes from "prop-types";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <SideDrawerToggle click={props.toggle} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

toolbar.propTypes = {
  toggle: PropTypes.func.isRequired
};

export default toolbar;
