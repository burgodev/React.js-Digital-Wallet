import React from "react";
import PropTypes from "prop-types";
import { Dialog, withStyles } from "@material-ui/core";

import ModalCreateAccountConfirmation from "./ModalCreateAccountConfirmation";

const CreateAccountConfirmation = ({ open, onClose, classes, accountType }) => {
  return (
    <Dialog
      classes={{
        paper: classes.paper,
      }}
      open={open}      
    >
      <ModalCreateAccountConfirmation onClose={onClose} accountType={accountType} />
    </Dialog>
  );
};

CreateAccountConfirmation.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  classes: PropTypes.object,
  accountType: PropTypes.string,
};

export default withStyles(() => ({
  paper: { borderRadius: 20, maxWidth: 500 },
}))(CreateAccountConfirmation);
