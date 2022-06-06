import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { withStyles } from "@material-ui/core";

const styles = {
  root: {
    zIndex: 0,
    // border: "1px solid rgb(23 129 159 / 20%)",
    border: "1px solid #727272",
    opacity: 0.1,
    // border: "1px solid #CBCBCB",
    boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.25)",
    height: 0,
    width: "100%",
  },
  vertical: {
    height: "100%",
    width: 0,
    zIndex: 0,
    border: "1px solid #727272",
    opacity: 0.1,
    boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.25)",
  },
  textDecoration: {
    width: 65,
    height: 6,
    background: "#5FB6AB",
    color: "#5FB6AB",
    borderRadius: 209,
    opacity: 1,
    border: "none",
  }
};

PropTypes.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  vertical: PropTypes.bool,
  textDecoration: PropTypes.bool,
  margin: PropTypes.oneOfType[(PropTypes.number, PropTypes.string)],
  width: PropTypes.oneOfType[(PropTypes.number, PropTypes.string)],
  height: PropTypes.oneOfType[(PropTypes.number, PropTypes.string)],
};

const Divider = ({
  className,
  margin,
  classes,
  vertical,
  textDecoration,
  height,
  width,
  color,
  ...props
}) => {
  return (
    <div
      className={cn(className, vertical && classes.vertical, textDecoration && classes.textDecoration, classes.root)}
      style={{
        margin,
        height,
        width,
        color,
      }}
      {...props}
    />
  );
};

export default withStyles(styles)(Divider);
