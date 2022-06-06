import React from "react";
import PropTypes from "prop-types";
import { Dialog, withStyles } from "@material-ui/core";

import ModalTransferConfirmation from "./ModalTransferConfirmation";

const TransferConfirmation = ({ open, onClose, classes }) => {
  return (
    <Dialog
      classes={{
        paper: classes.paper,
      }}
      open={open}
    >
      <ModalTransferConfirmation onClose={onClose} />
    </Dialog>
  );
};

TransferConfirmation.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  classes: PropTypes.object,  
};

export default withStyles(() => ({
  paper: { borderRadius: 20, maxWidth: 500 },
}))(TransferConfirmation);
