import React from "react";
import PropTypes from "prop-types";
import { Dialog, withStyles } from "@material-ui/core";

import ModalActions from "./ModalActions";

const Actions = ({ open, action, onClose, classes }) => {
  console.log("action", action)
  return (
    <Dialog
      classes={{
        paper: classes.paper,
      }}
      maxWidth="sm"
      open={open}
      onClose={onClose}
    >
      <ModalActions onClose={onClose} action={action} />
    </Dialog>
  );
};

Actions.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  classes: PropTypes.object,
  action: PropTypes.number,
};

export default withStyles(() => ({
  paper: { borderRadius: 20, maxWidth: 520 },
}))(Actions);
