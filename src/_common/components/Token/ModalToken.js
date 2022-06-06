import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DialogTitle, withStyles, DialogContent } from "@material-ui/core";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { useTranslation } from "react-i18next";

import { Flex, Card, Button, Typography } from "../";
import { useSnackbar } from "../../../_common/hooks"
import api from "../../../services/api";

PropTypes.propTypes = {
  classes: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};


const ModalToken = ({ classes, onClose }) => {
  const i18n = useTranslation().t;
  const [token, setToken] = useState()
  const [loading, setLoading] = useState()
  const [openSnackbar] = useSnackbar()

  const copyToClipboard = () => {
    var input = document.getElementById("button-token");
    input.select();
    document.execCommand("copy");
    openSnackbar("Sucessfully Copied ", "success")
  }

  useEffect(() => {
    getToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getToken = async () => {
    try {
      setLoading(true)
      const { data } = await api.get("/user/profile/get-integration-token")
      setToken(data.payload.integration_token)
    } catch (e) {
      openSnackbar(`${e.response.data.message}`, "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className={classes.card}>
      <DialogTitle disableTypography className={classes.title}>
        <LockOpenIcon className={classes.icon} />
      </DialogTitle>

      <DialogContent>
        <Flex flexDirection="column" center >
          <Typography className={classes.typography2}>            
            {i18n("modalToken.hint")}
          </Typography>

          <Button onClick={copyToClipboard} fullWidth loading={loading}>
            <input value={token} className={classes.input} id="button-token" />
            <FileCopyIcon />
          </Button>

          <Typography className={classes.typography} >            
            {i18n("modalToken.description")}
          </Typography>
        </Flex>
      </DialogContent>
    </Card>
  );
};

export default withStyles((theme) => ({
  title: {
    padding: 0,
    width: "100%",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  card: {
    boxShadow: "10px 10px 50px rgba(0, 0, 0, 0.5)",
    padding: "32px 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "480px",

  },
  typography: {
    marginTop: 16,
    alignSelf: "center",
    fontSize: 14,
    width: "75%",
    textAlign: "center"
  },
  icon: {
    color: theme.palette.main,
    fontSize: 80
  },
  input: {
    all: "unset",
    width: "100%"
  },
  button: {
    padding: "0 24px"
  },
  typography2: {
    fontWeight: 500,
    fontSize: 20,
    width: "80%",
    marginTop: 24,
    marginBottom: 16
  }
}))(ModalToken);
