import React from "react";
import PropTypes from "prop-types";
import { Dialog, withStyles } from "@material-ui/core";

import ModalChangeLevel from "./ModalChangeLevel";

const ChangeLevel = ({ item, open, onClose, classes }) => {
  return (
    <Dialog
      classes={{
        paper: classes.paper,
      }}
      maxWidth="sm"
      open={open}
      onClose={onClose}
    >
      <ModalChangeLevel onClose={onClose} item={item} />
    </Dialog>
  );
};

ChangeLevel.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  classes: PropTypes.object,
  operations: PropTypes.func,
};

export default withStyles(() => ({
  paper: { borderRadius: 20, maxWidth: 520 },
}))(ChangeLevel);
