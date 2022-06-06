import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Button,
  Container,
  Navigation,
  Typography,
  Card,
  Flex
} from "../../../../_common/components";
import api from "../../../../services/api";
import { useSnackbar } from "../../../../_common/hooks"
import { useNavigation } from "../../../../_common/hooks";


const NewDeposit = ({ classes }) => {
  const i18n = useTranslation().t;
  const navList = useNavigation("deposit");
  const history = useHistory();
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState("")
  const [openSnackbar] = useSnackbar();


  const copyToClipboard = () => {
    var input = document.getElementById("button-code");
    input.select();
    document.execCommand("copy");
    openSnackbar("Copiado com sucesso", "success")
  }

  const getCode = async () => {
    try {
      setLoading(true)
      const { data } = await api.get("/client/wallet/address")
      const address = data.payload.address
      setCode(address)
    } catch (e) {
      openSnackbar(e.response.data.message, "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className={classes.container}>
      <Navigation navList={navList} initialValue={"newDeposit"} />

      {/* <Typography fontSize={28} fontWeight={600}>Novo Depósito</Typography> */}
      {code.length ?
        <>
          <Flex flexDirection="column" center>
            <Typography>{i18n("newDeposit.code")}</Typography>
            <Button onClick={copyToClipboard} className={classes.copyButton}>
              <input value={code} className={classes.input} id="button-code" />
              <FileCopyIcon />
            </Button>
            <Button variant="text" onClick={() => history.push("/client/accounts/real-account")} className={classes.textButton}>
              {i18n("newDeposit.transfer")}
            </Button>
          </Flex>
          <Flex />
        </>
        :
        <>
          <Typography fontSize={18}>
            {i18n("newDeposit.hint")}
          </Typography>
          <Card className={classes.card}>
            <Typography fontSize={18} fontWeight={600}>{i18n("newDeposit.instructions")}</Typography>
            <Typography textAlign="left">- {i18n("newDeposit.instruction1")}</Typography>
            <Typography textAlign="left">- {i18n("newDeposit.instruction2")}</Typography>
          </Card>
          <Typography>* {i18n("newDeposit.declaration")} </Typography>
          <Button onClick={getCode} loading={loading} className={classes.button}> {i18n("newDeposit.generateCode")}</Button>
        </>
      }

    </Container >
  );
}

NewDeposit.propTypes = {
  classes: PropTypes.object,
};

export default withStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  input: {
    all: "unset",
    width: "100%"
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: 440,
    height: 280,
    padding: "32px 40px",
    background: "#5FB6AB",
    boxShadow: "inset 4px 4px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: "16px 0px 16px 16px",
    color: "white",
    [theme.breakpoints.down("lg")]: {
      width: 420,
      height: 240,
    },
    [theme.breakpoints.down("sm")]: {
      width: 360,
      height: 200,
      padding: "16px 24px",
    },
  },
  button: {
    marginTop: 32,
    width: "50%",
    boxSadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 16,
    [theme.breakpoints.down("sm")]: {      
      width: "90%",
    },
  },
  textButton: {
    width: "40%",
    color: theme.palette.main,
    border: "1px solid #5FB6AB",
    // box- shadow: inset 4px 4px 10px rgba(0, 0, 0, 0.25);
    borderRadius: 16,
    padding: 16,
    [theme.breakpoints.down("sm")]: {      
      width: "90%",
    },

  },
  copyButton: {
    width: "40%",
    margin: "16px 0",
    [theme.breakpoints.down("sm")]: {      
      width: "90%",
    },

  }

}))(NewDeposit);
