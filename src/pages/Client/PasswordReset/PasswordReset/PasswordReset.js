import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";
import { withStyles, TextField } from "@material-ui/core";
import loginBackground from "../../../../assets/images/loginBackground.jpg";

import {
  Flex,
  Button,  
  Card,
  Typography,
  Container,
} from "../../../../_common/components";
import { useSnackbar } from "../../../../_common/hooks";
import api from "../../../../services/api";

PropTypes.propTypes = {
  classes: PropTypes.object,
};

const initialValues = { email: "" };

const validMail = (mail) => {
  // eslint-disable-next-line no-useless-escape
  return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
    mail
  );
};

const validate = (values) => {
  const errors = {};

  if (!values.email.length) {
    errors.email = "Campo obrigatório *";
    return errors;
  }

  if (!validMail(values.email)) {
    errors.email = "E-mail inválido";
    return errors;
  }

  return errors;
};

const PasswordReset = ({ classes }) => {
  const history = useHistory();
  const i18n = useTranslation().t;
  const [loading, setLoading] = useState(false);
  const [openSnackbar] = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await api.post(`/auth/request-password-recovery`, values);

      history.push("/password-recover/email-verification");
    } catch (error) {
      openSnackbar(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className={classes.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validate}
      >
        {(bag) => (
          <Form>
            <Card className={classes.card}>
              <Flex>
                <Typography className={classes.typography}>
                  {i18n("passwordReset.resetPassword")}
                </Typography>
              </Flex>
              <Flex>
                <Typography element="p" margin="0 0 24px 0" textAlign="left">
                  {i18n("passwordReset.description")}
                </Typography>
              </Flex>

              <TextField
                variant="outlined"
                fullWidth
                id="email"
                name="email"
                label="E-mail"
                InputLabelProps={{ shrink: true }}
                size="small"
                value={bag.values.email}
                onChange={bag.handleChange}
                error={bag.touched.email && Boolean(bag.errors.email)}
                helperText={bag.touched.email && bag.errors.email}
              />

              <Flex flexDirection="column" margin="8px 0 0 0">
                <Button
                  type="submit"
                  className={classes.button}
                  loading={loading}
                >
                  {i18n("passwordReset.send")}                  
                </Button>

                <Button
                  disabled={loading}
                  variant="text"
                  onClick={() => history.push("/")}
                >
                  {i18n("passwordReset.back")}                   
                </Button>
              </Flex>
            </Card>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default withStyles((theme) => ({
  card: {
    boxShadow: "10px 10px 50px rgba(0, 0, 0, 0.5)",
    padding: "32px 32px 32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 420,
    width: 420,
    borderRadius: 20,
    background: "white",
    [theme.breakpoints.down("lg")]: {      
      width: 360,
    },
  },
  typography: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.palette.main,
  },
  flex: {
    marginTop: 48,
    marginBottom: 52,
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
}))(PasswordReset);
