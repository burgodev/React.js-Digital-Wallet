import React from "react";
import PropTypes from "prop-types";
import { DialogTitle, withStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import selectLogo from "../../../../../assets/images/select-logo.png";
import { Flex, Card, Button } from "../../../../../_common/components";
import ChangeManagerContent from "./ChangeManagerContent";

PropTypes.propTypes = {
  classes: PropTypes.object,
  item: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};


const ModalChangeManager = ({ classes, item, onClose }) => {
  return (
    <Card className={classes.card}>

      <DialogTitle disableTypography className={classes.title}>
        <Flex justifyContent="flex-end" width="100%">
          <Button
            variant="icon"
            onClick={onClose}
            className={classes.iconButton}
          >
            <CloseIcon />
          </Button>
        </Flex>
        <Flex center width="100%">
          <img
            src={selectLogo}
            alt="selectLogo"
            className={classes.selectLogo}
          />
        </Flex>
      </DialogTitle>


      <ChangeManagerContent onClose={onClose} item={item} />
    </Card>
  );
};

export default withStyles((theme) => ({
  title: {
    padding: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    flexDirection: "column",
  },
  card: {
    boxShadow: "10px 10px 50px rgba(0, 0, 0, 0.5)",
    padding: "24px 32px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 480,
  },
  iconButton: {
    color: "#5fb6ab",
    borderRadius: "50%",
    padding: 0,
  },
  selectLogo: {
    width: "40%",
  },
}))(ModalChangeManager);
