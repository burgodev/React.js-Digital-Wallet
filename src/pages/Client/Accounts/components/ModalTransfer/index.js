import React from "react";
import PropTypes from "prop-types";
import { Dialog, withStyles } from "@material-ui/core";

import ModalTransfer from "./ModalTransfer";

const Transfer = ({ open, operations, onClose, classes, initial, balance }) => {
  return (
    <Dialog
      classes={{
        paper: classes.paper,
      }}
      open={open} 
      onClose={onClose}
    >
      <ModalTransfer onClose={onClose} operations={operations} initial={initial} balance={balance} />
    </Dialog>
  );
};

Transfer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  classes: PropTypes.object,
  operations: PropTypes.func,
  initial: PropTypes.object,
  balance: PropTypes.number,
};

export default withStyles(() => ({
  paper: { borderRadius: 20, maxWidth: 500 },
}))(Transfer);
