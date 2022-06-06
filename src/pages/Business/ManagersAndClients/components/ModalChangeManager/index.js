import React from "react";
import PropTypes from "prop-types";
import { Dialog, withStyles } from "@material-ui/core";

import ModalChangeManager from "./ModalChangeManager";

const ChangeManager = ({ item, open, onClose, classes }) => {
  return (
    <Dialog
      classes={{
        paper: classes.paper,
      }}
      maxWidth="sm"
      open={open}
      onClose={onClose}
    >
      <ModalChangeManager onClose={onClose} item={item} />
    </Dialog>
  );
};

ChangeManager.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  classes: PropTypes.object,
  operations: PropTypes.func,
};

export default withStyles(() => ({
  paper: { borderRadius: 20, maxWidth: 520 },
}))(ChangeManager);
