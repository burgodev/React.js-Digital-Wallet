import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useTranslation } from "react-i18next";

import { Typography, Card, Button, Divider } from "../../..";
import { STEPS } from "../../ModalTutorial";

const RealAccount = ({ classes, callback }) => {
  const i18n = useTranslation().t;
  const history = useHistory();

  return (
    <Card clean className={classes.realAccount}>
      <Typography fontWeight="bold" fontSize={32}>
        {i18n("modalTutorial.realAccount")}
      </Typography>

      <Divider className={classes.divider} margin="0 0 24px" />

      <Typography fontSize={24}>
        {i18n("modalTutorial.hasUsdx")}
      </Typography>
      <Button
        onClick={() => history.push("/client/deposit/new-deposit")}
        className={classes.buttonDeposit}
      >
        {i18n("button.deposit")}
      </Button>
      <Button
        href="https://www.ax-bank.com/"
        secondary
        target="_blank"
        margin="8px"
      >
        {i18n("button.buyUsdx")}
      </Button>

      <Button onClick={() => callback(STEPS.USDX)} variant="text">
        {i18n("button.whatIsUsdx")}
      </Button>

      <Button
        variant="icon"
        className={classes.iconButton}
        marginTop="8px 0 0"
        onClick={() => callback(STEPS.ACCOUNT_TYPE)}
      >
        <ArrowBackIcon fontSize="medium" />
      </Button>
    </Card>
  );
};

RealAccount.propTypes = {
  classes: PropTypes.object,
  callback: PropTypes.func.isRequired,
};

export default withStyles((theme) => ({
  realAccount: {
    height: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "16px",
  },
  buttonDeposit: {
    marginBottom: 12,
    marginTop: 24,
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
  iconButton: {
    color: "#5fb6ab",
    borderRadius: "50%",
    padding: 0,
  },
}))(RealAccount);
