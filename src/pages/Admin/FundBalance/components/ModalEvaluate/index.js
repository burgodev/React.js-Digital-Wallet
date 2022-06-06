import React from "react";
import PropTypes from "prop-types";
import { Dialog, withStyles } from "@material-ui/core";

import ModalEvaluate from "./ModalEvaluate";

const Evaluate = ({ item, open, onClose, classes }) => {
  return (
    <Dialog
      classes={{
        paper: classes.paper,
      }}
      maxWidth="sm"
      open={open}
      onClose={onClose}
    >
      <ModalEvaluate onClose={onClose} item={item} />
    </Dialog>
  );
};

Evaluate.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  classes: PropTypes.object,
  operations: PropTypes.func,
};

export default withStyles(() => ({
  paper: { borderRadius: 20, maxWidth: 520 },
}))(Evaluate);
