import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useTranslation } from "react-i18next";

import { Typography, Card, Button, Divider } from "../../..";

PropTypes.propTypes = {
  classes: PropTypes.object,
  callback: PropTypes.func.isRequired,
};

const DemoAccount = ({ classes, callback }) => {
  const history = useHistory();
  const i18n = useTranslation().t;

  return (
    <Card clean className={classes.step2}>
      <Typography className={classes.subtitle} width="60%">
        {i18n("modalTutorial.demoAccount")}
      </Typography>
      <Divider className={classes.divider} margin="0 0 24px" />
      <Typography fontWeight="bold" fontSize={24}>
        {i18n("modalTutorial.metatraderAccount")}
      </Typography>
      <Typography fontSize={15} margin="0 0 16px">
        {i18n("modalTutorial.metatraderDescription")}
      </Typography>
      <Typography fontWeight="bold" fontSize={24}>
        {i18n("modalTutorial.botmoneyAccount")}
      </Typography>
      <Typography fontSize={15} margin="0 0 22px">
        {i18n("modalTutorial.botmoneyDescription")}
      </Typography>

      <Button
        onClick={() => history.push("/client/accounts/create-account/demo")}
        margin="0 0 12px"
      >
        {i18n("button.createAccount")}
      </Button>
      <Button variant="icon" className={classes.iconButton} onClick={callback}>
        <ArrowBackIcon fontSize="medium" />
      </Button>
    </Card>
  );
};

export default withStyles((theme) => ({
  step2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "80%",
    overflow: "hidden",
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 35,
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
}))(DemoAccount);
