import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import PropTypes from "prop-types";

const modal = props => (
  <>
    <Backdrop show={props.show} clicked={props.backdropClick} />
    <div
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0"
      }}
      className={classes.Modal}
    >
      {props.children}
    </div>
  </>
);

modal.propTypes = {
  backdropClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default modal;
