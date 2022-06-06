import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { withStyles, TextField } from "@material-ui/core";
import PropTypes from "prop-types";

import { validEmail } from "../../../../../_common/utils/functions";
import api from "../../../../../services/api";
import {
  Flex,
  Card,
  Typography,
  Button,
} from "../../../../../_common/components";
import { ROLES } from "../../../../../_common/utils/constants"
import { useSnackbar } from "../../../../../_common/hooks"

const LoginForm = ({ classes }) => {
  const history = useHistory();
  const i18n = useTranslation().t;
  const [loading, setLoading] = useState(false);
  const [openSnackbar] = useSnackbar();


  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await api.post("auth/sign-in", values);

      localStorage.setItem("token", data.payload.token);
      localStorage.setItem("role", data.payload.role);
      localStorage.setItem("first_login", data.payload.first_login);
      localStorage.setItem("email", values.email);

      // history.push("/client/accounts/real-account");
      redirect(data.payload.role, data.payload.first_login);
    } catch (e) {
      openSnackbar(e.response.data.message, "error")
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validate}
    >
      {(formik) => (
        <Form>
          <Card className={classes.card}>
            <Typography className={classes.typography}>{i18n("login.title")}</Typography>

            <Flex flexDirection="column">
              <TextField
                fullWidth
                variant="outlined"
                className={classes.inputFields}
                id="email"
                name="email"
                label="E-mail"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                fullWidth
                variant="outlined"
                className={classes.inputFields}
                id="password"
                name="password"
                label={i18n("login.password")}
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Typography
                element="a"
                url="/password-recover"
                textAlign="left"
                className={classes.forgotPassword}
              >
                {i18n("login.password_forgot")}
              </Typography>
            </Flex>
            <Flex flexDirection="column">
              <Button
                type="submit"
                className={classes.button}
                loading={loading}
              >
                {i18n("login.enter")}
              </Button>
              <Flex center>
                <Typography fontSize={12} fontWeight={500}>
                  {i18n("login.noAccount")}
                </Typography>
                <Button
                  variant="text"
                  disabled={loading}
                  className={classes.textButton}
                  onClick={() => history.push("/register")}
                >
                  {i18n("login.register")}
                </Button>
              </Flex>
            </Flex>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

const initialValues = {
  email: "",
  password: "",
};

const validate = (values) => {
  const errors = {};

  if (!validEmail(values.email)) {
    errors.email = "Campo obrigatório *";
    return errors;
  }

  if (!values.password) {
    errors.password = "Campo obrigatório *";
    return errors;
  }

  return errors;
};

const redirect = (role, firstLogin) => {

  switch (role.toUpperCase()) {
    case ROLES.CLIENT: {
      if (firstLogin) {
        window.location.href = "/profile/validation/data"
      } else {
        window.location.href = "/client/accounts/real-account"
      }
      break;
    }
    case ROLES.ADMIN: {
      window.location.href = "/admin/home"
      break;
    }
    case ROLES.MANAGER: {
      window.location.href = "/manager/home"
      break;
    }
    case ROLES.SUPPORT: {
      window.location.href = "/support/users/validation"
      break;
    }
    case ROLES.BUSINESS: {
      window.location.href = "/business/managers-and-clients"
      break;
    }
    default: {
      window.location.href = "/"
      break;
    }
  }

}

export default withStyles((theme) => ({
  card: {
    boxShadow: "10px 10px 50px rgba(0, 0, 0, 0.5)",
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 460,
    width: 400,
    borderRadius: 20,
    background: "rgb(255 255 255 / 50%)",
    [theme.breakpoints.down("lg")]: {
      background: "rgb(255 255 255 / 90%)",
      width: 360,
    },
  },
  typography: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "600",
  },
  button: {
    width: "100%",
    fontSize: 18,
    fontWeight: 600,
    height: 40,
    margin: "8px 0",
  },

  forgotPassword: {
    fontSize: "0.85rem",
    color: theme.palette.main,
    marginTop: "5px",
  },
  textButton: {
    fontSize: 12,
    color: theme.palette.main,
  },
  inputFields: {
    fontWeight: "400",
    fontSize: "0.9rem",
    margin: "0px 0px 8px 0px",
  },
}))(LoginForm);

LoginForm.propTypes = {
  classes: PropTypes.object,
};
