import React from "react";
import PropTypes from "prop-types";
import { Dialog, withStyles } from "@material-ui/core";

import ModalTutorial from "./ModalTutorial";

const Tutorial = ({ open, operations, onClose, classes }) => {
  return (
    <Dialog
      classes={{
        paper: classes.paper,
      }}
      maxWidth="sm"
      open={open} 
      onClose={onClose}
    >
      <ModalTutorial onClose={onClose} operations={operations} />
    </Dialog>
  );
};

Tutorial.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  classes: PropTypes.object,
  operations: PropTypes.func,
};

export default withStyles(() => ({
  paper: { borderRadius: 20, maxWidth: 520 },
}))(Tutorial);
