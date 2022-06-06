import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

const styles = {
  root: {
    width: "70%",
    padding: "40px",
    borderRadius: "27px",
    background: "#FFF",
  },
};

const Card = ({
  children,
  className,
  style,
  classes,
  width,
  height,
  background,
  clean,

  ...rest
}) => (
  <div
    className={className}
    style={{ width, height, background, ...style }}
    {...rest}
  >
    {children}
  </div>
);

Card.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
};

Card.defaultProps = {};

export default withStyles(styles)(Card);
