import React from "react";
import Logo from "../../Layout/Logo/Logo";
import NavigationItems from "../../Navigation/NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import BackDrop from "../../UI/Backdrop/Backdrop";
import PropTypes from "prop-types";

const sideDrawer = props => {
  console.log("TCL: sideDrawer", props);
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <>
      <BackDrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </>
  );
};

sideDrawer.propTyps = {
  closed: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default sideDrawer;
