import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { withStyles, Fade } from "@material-ui/core";

const styles = {
  root: {
    height: "100%",
    width: "100%",
  },
};

PropTypes.propTypes = {
  classes: PropTypes.object,
  clean: PropTypes.bool,
  className: PropTypes.string,
  height: PropTypes.string,
};

const Container = ({ className, clean = false, height, classes, ...props }) => {
  return (
    <Fade in={true} timeout={500}>
      <div className={cn(clean ? null : classes.root, className)} {...props} />
    </Fade>
  );
};

export default withStyles(styles)(Container);
