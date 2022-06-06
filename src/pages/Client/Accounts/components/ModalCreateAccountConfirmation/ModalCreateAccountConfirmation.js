import React from "react";
import PropTypes from "prop-types";
import { DialogTitle, DialogContent, DialogActions, withStyles } from "@material-ui/core";
// import { useTranslation } from "react-i18next";

import { useHistory } from "react-router-dom";
import {
  Card,
  Button,
  Typography,
} from "../../../../../_common/components";
import congrats from "../../../../../assets/images/congrats.png";
import { ACCOUNT_TYPE } from "../../CreateAccount/utils"

const ModalCreateAccountConfirmation = ({ classes, accountType }) => {
  // const i18n = useTranslation().t;
  const history = useHistory();
  
  return (
    <Card className={classes.card}>
      <DialogTitle disableTypography className={classes.title}>
        <img
          src={congrats}
          alt="Congratulations"
        />
      </DialogTitle>

      <DialogContent className={classes.content}>
        <Typography fontWeight={600} fontSize={32} margin="0 0 16px"> Parabéns</Typography>
        <Typography fontSize={18}>Sua conta {accountType.toUpperCase() === ACCOUNT_TYPE.DEMO ? "demo" : "real"} foi criada com sucesso!</Typography>
      </DialogContent>
      <DialogActions className={classes.actions}>
        {accountType.toUpperCase() !== ACCOUNT_TYPE.DEMO &&
          <>
            <Button onClick={() => history.push("/client/accounts/real-account")} className={classes.button}>
              Transferência
            </Button>
            <Button onClick={() => history.push("/client/deposit/new-deposit")} variant="outlined" className={classes.button}>
              Depositar USDX
            </Button>
          </>
        }
        <Button
          onClick={() => accountType.toUpperCase() === ACCOUNT_TYPE.DEMO ? history.push("/client/accounts/demo-account") : history.push("/client/accounts/real-account")}
          variant={accountType.toUpperCase() === ACCOUNT_TYPE.DEMO ? "contained" : "text"}
          className={classes.button}>
          Entendi
        </Button>
      </DialogActions>
    </Card >
  );
};

ModalCreateAccountConfirmation.propTypes = {
  classes: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};


export default withStyles((theme) => ({
  title: {
    padding: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    flexDirection: "column",
    marginBottom: 12,
  },
  card: {
    width: 480,
    minHeight: 480,
    padding: "48px 40px 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  textfield: {
    margin: "8px",
  },
  actions: {
    display: "flex",
    flexDirection: "column",

  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  button: {
    margin: "8px 0"
  }
}))(ModalCreateAccountConfirmation);
