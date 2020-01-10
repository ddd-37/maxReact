import React, { Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import PropTypes from "prop-types";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  };

  // Becuase the new state (open or closed) depends on the previous state. It's better to use the prevState object to apply our new state
  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
    // For example, this can lead to weird behavior
    // this.setState({
    //   showSideDrawer: !this.state.showSideDrawer
    // });
  };

  render() {
    //console.log(this.props);
    return (
      <>
        <Toolbar
          open={this.state.showSideDrawer}
          toggle={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          closed={this.sideDrawerClosedHandler}
          open={this.state.showSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </>
    );
  }
}

Layout.propType = {
  children: PropTypes.object
};

export default Layout;
