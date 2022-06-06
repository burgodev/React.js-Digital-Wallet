import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useTranslation } from "react-i18next";

import { Typography, Card, Button, Divider } from "../../..";

PropTypes.propTypes = {
  classes: PropTypes.object,
  callback: PropTypes.func.isRequired,
};

const DemoAccount = ({ classes, callback }) => {
  const i18n = useTranslation().t;
  return (
    <Card clean className={classes.container}>
      <Typography fontWeight="bold" fontSize={32}>
        {i18n("modalTutorial.whatIsUsdx")}
      </Typography>

      <Divider className={classes.divider} margin="0 0 32px" />
      <Typography className={classes.typography}>
        {i18n("modalTutorial.usdxDescription")}
      </Typography>
      <Button
        margin="24px 0 16px"
        href="https://www.ax-bank.com/"
        target="_blank"
      >
        {i18n("button.buy")}
      </Button>
      <Button variant="icon" className={classes.iconButton} onClick={callback}>
        <ArrowBackIcon fontSize="medium" />
      </Button>
    </Card>
  );
};

export default withStyles((theme) => ({
  container: {
    height: "72.5%",
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
  typography: {
    fontSize: 16,
    marginTop: 12,
    width: "80%",
  },
  iconButton: {
    color: "#5fb6ab",
    borderRadius: "50%",
    padding: 0,
  },
}))(DemoAccount);
