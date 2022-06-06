import React, { useState } from "react";
import PropTypes from "prop-types";
import { DialogTitle, withStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import selectLogo from "../../../assets/images/select-logo.png";
import { Flex, Card, Button } from "../";
import {
  Welcome,
  AccountType,
  DemoAccount,
  RealAccount,
  Usdx,
} from "./components";

PropTypes.propTypes = {
  classes: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export const STEPS = {
  WELCOME: "WELCOME",
  ACCOUNT_TYPE: "ACCOUNT_TYPE",
  DEMO_ACCOUNT: "DEMO_ACCOUNT",
  REAL_ACCOUNT: "REAL_ACCOUNT",
  USDX: "USDX",
};

const ModalTutorial = ({ classes, onClose }) => {
  const [step, setStep] = useState(STEPS.WELCOME);

  const closeModal = () => {
    localStorage.setItem("first_login", false);
    onClose();
  }

  return (
    <Card className={classes.card}>
      <DialogTitle disableTypography className={classes.title}>
        <Flex justifyContent="flex-end" width="100%">
          <Button
            variant="icon"
            onClick={closeModal}
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

      {step === STEPS.WELCOME && (
        <Welcome callback={() => setStep(STEPS.ACCOUNT_TYPE)} />
      )}
      {step === STEPS.ACCOUNT_TYPE && (
        <AccountType callback={(step) => setStep(step)} />
      )}
      {step === STEPS.DEMO_ACCOUNT && (
        <DemoAccount callback={() => setStep(STEPS.ACCOUNT_TYPE)} />
      )}
      {step === STEPS.REAL_ACCOUNT && (
        <RealAccount callback={(step) => setStep(step)} />
      )}
      {step === STEPS.USDX && (
        <Usdx callback={() => setStep(STEPS.REAL_ACCOUNT)} />
      )}
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
    padding: "24px 32px 24px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 540,
  },
  iconButton: {
    color: "#5fb6ab",
    borderRadius: "50%",
    padding: 0,
  },
  selectLogo: {
    width: "40%",
  },
}))(ModalTutorial);
