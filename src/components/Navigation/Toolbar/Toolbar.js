import React from "react";
import classes from "./Toolbar.module.css";
import Logo from "../../Layout/Logo/Logo";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <div>MENU</div>
    <Logo />
    <nav>
      <ul>LINKS</ul>
    </nav>
  </header>
);

export default toolbar;
