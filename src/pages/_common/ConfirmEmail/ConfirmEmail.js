import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import api from '../../../services/api'
import loginBackground from "../../../assets/images/loginBackground.jpg";
import {
  Flex,
  Button,
  Card,
  Typography,
  Container,
} from "../../../_common/components";
import { useSnackbar } from "../../../_common/hooks";

const ConfirmEmail = ({ classes }) => {
  const history = useHistory();
  const { token } = useParams();
  const i18n = useTranslation().t;
  const [loading, setLoading] = useState(false);
  const [openSnackbar] = useSnackbar();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await api.post(`/auth/client/email-confirmation`, { token });
      openSnackbar("Email confirmado com sucesso", "success");
      history.push("/");
    } catch (error) {
      openSnackbar(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <Flex center>
          <Typography className={classes.typography}>
            {i18n("confirmEmail.title")}
          </Typography>
        </Flex>

        <Flex flexDirection="column" center className={classes.flex}>
          <Typography textAlign="center">
            {i18n("confirmEmail.description")}
          </Typography >
        </Flex >

        <Flex flexDirection="column" margin="8px 0 0 0">
          <Button
            onClick={handleSubmit}
            className={classes.button}
            loading={loading}
          >
            {i18n("confirmEmail.confirm")}
          </Button>
        </Flex>
      </Card >
    </Container >
  );
};

ConfirmEmail.propTypes = {
  classes: PropTypes.object,
};

export default withStyles((theme) => ({
  card: {
    boxShadow: "10px 10px 50px rgba(0, 0, 0, 0.5)",
    padding: "32px 32px 32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 380,
    width: 420,
    borderRadius: 20,
    background: "white",
  },
  typography: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: theme.palette.main,
  },
  button: {
    width: "100%",
    fontSize: 18,
    height: 40,
    margin: "8px 0",
  },
  container: {
    height: "100vh",
    width: "100vw",
    backgroundImage: `linear-gradient(to right, #eaeaea , rgb(255 255 255 / 0%)),url(${loginBackground})`,
    backgroundSize: "contain",
    backgroundPositionX: "right",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
  },
  flex: {
    marginBottom: 24
  }
}))(ConfirmEmail);
