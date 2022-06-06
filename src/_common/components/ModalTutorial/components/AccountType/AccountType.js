import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { Typography, Card, Button, Divider } from "../../..";
import { STEPS } from "../../ModalTutorial";

PropTypes.propTypes = {
  classes: PropTypes.object,
  callback: PropTypes.func.isRequired,
};

const AccountType = ({ classes, callback }) => {
  const i18n = useTranslation().t;
  return (
    <Card clean className={classes.accountType}>
      <Typography className={classes.subtitle} width="60%">
        {i18n("modalTutorial.start")}
      </Typography>
      <Divider className={classes.divider} margin="0 0 60px" />
      <Button onClick={() => callback(STEPS.REAL_ACCOUNT)} margin="0 0 12px">
        {i18n("button.realAccount")}
      </Button>
      <Button onClick={() => callback(STEPS.DEMO_ACCOUNT)} secondary>
        {i18n("button.demoAccount")}
      </Button>
    </Card>
  );
};

export default withStyles((theme) => ({
  subtitle: {
    fontWeight: "bold",
    fontSize: 35,
  },
  accountType: {
    height: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "16px",
  },

  divider: {
    width: 65,
    height: 6,
    background: "#5FB6AB",
    color: "#5FB6AB",
    borderRadius: 209,
    opacity: 1,
    border: "none",
  },
}))(AccountType);
