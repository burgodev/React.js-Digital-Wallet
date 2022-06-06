import React, { useState } from "react";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { withStyles, TextField } from "@material-ui/core";
import loginBackground from "../../../../assets/images/loginBackground.jpg";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import {
  Flex,
  Button,  
  Typography,
  Card,
  Container,
} from "../../../../_common/components";
import { useSnackbar } from "../../../../_common/hooks"
import api from "../../../../services/api";

PropTypes.propTypes = {
  classes: PropTypes.object,
  showLogin: PropTypes.func,
  showPasswordReset: PropTypes.func,
};

const initialValues = { password: "", confirmPassword: "" };

const validate = (values) => {
  const errors = {};

  if (!values.password.length) {
    errors.password = "Campo obrigatório *";
    return errors;
  }

  if (!values.confirmPassword.length) {
    errors.confirmPassword = "Campo obrigatório *";
    return errors;
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "As senhas precisam ser iguais";
    return errors;
  }

  return errors;
};

const ChangePassword = ({ classes }) => {
  let { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [openSnackbar] = useSnackbar();
  const i18n = useTranslation().t;

  let history = useHistory();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      await api.post(`/auth/password-recovery`, {
        password: values.password,
        password_confirm: values.confirmPassword,
        token: token,
      });

      history.push("/");
    } catch (error) {
      openSnackbar(error.response.data.message, "error")
      console.log(error.message);
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
              <Typography className={classes.typography}>
                {i18n("changePassword.title")}
              </Typography>
              <Typography element="p" margin="0 0 24px 0">
                {i18n("changePassword.description")}
              </Typography>

              <Flex flexDirection="column">
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  name="password"
                  type="password"
                  label={i18n("changePassword.password")}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  value={bag.values.password}
                  onChange={bag.handleChange}
                  error={bag.touched.password && Boolean(bag.errors.password)}
                  helperText={bag.touched.password && bag.errors.password}
                />

                <TextField
                  variant="outlined"
                  type="password"
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  label={i18n("changePassword.confirm")}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  value={bag.values.confirmPassword}
                  onChange={bag.handleChange}
                  error={
                    bag.touched.confirmPassword &&
                    Boolean(bag.errors.confirmPassword)
                  }
                  helperText={
                    bag.touched.confirmPassword && bag.errors.confirmPassword
                  }
                  className={classes.textfield}
                />
              </Flex>
              <Flex flexDirection="column">
                <Button
                  type="submit"
                  className={classes.button}
                  loading={loading}
                >
                  {i18n("button.save")}
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
  },
  typography: {
    color: theme.palette.main,
    fontSize: 24,
    fontWeight: "600",
  },
  button: {
    width: "100%",
    fontSize: 18,
    fontWeight: 600,
    height: 40,
    margin: "8px 0",
  },
  textfield: {
    marginTop: 16,
    marginBottom: 32,
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
}))(ChangePassword);
