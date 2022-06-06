import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles, Dialog, IconButton } from "@material-ui/core";
import LockOpenIcon from '@material-ui/icons/LockOpen';

import ModalToken from "./ModalToken";

const Token = ({ classes, ...props }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)} className={classes.button} {...props}>
        <LockOpenIcon />
      </IconButton>
      <Dialog
        maxWidth="sm"
        fullWidth open={open}
        onClose={() => setOpen(false)}
        classes={{
          paper: classes.paper,
        }}>
        <ModalToken onClose={() => setOpen(false)} />
      </Dialog>
    </ >
  );
}

Token.propTypes = {
  classes: PropTypes.object
};


export default withStyles((theme) => ({
  paper: {
    borderRadius: 20,
    maxWidth: 520
  },
  button: {
    width: 48,
    cursor: "pointer",
    height: 48,
    background: theme.palette.main,
    boxShadow: "inset 4px 4px 10px rgb(0 0 0 / 25%)",
    marginRight: 8,
    borderRadius: 16,
    color: "white",
    "&:hover": {
      color: "white",
      background: theme.palette.main,
      boxShadow: "inset 4px 4px 10px rgb(0 0 0 / 25%)",
    },
    [theme.breakpoints.down("lg")]: {
      height: "36px",
      width: "36px"
    },
  }
}))(Token);
