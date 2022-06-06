import React, { useState } from "react";
import { Formik, Form } from "formik";
import { withStyles, TextField, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import {
  Button,
  Container,
  Navigation,
} from "../../../../_common/components";
import { useSnackbar, useNavigation } from "../../../../_common/hooks";
import api from "../../../../services/api";

const ChangePassword = ({ classes }) => {
  const i18n = useTranslation().t;
  const [loading, setLoading] = useState(false);
  const navList = useNavigation("profile");
  const [openSnackbar] = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await api.post("/user/profile/change-password", values);
      openSnackbar("Alterações salvas com sucesso", "success")
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
        <Form className={classes.form}>
          <Container className={classes.container} >
            <Navigation navList={navList} initialValue={"changePassword"} />

            <Grid container spacing={3} className={classes.formContainer}>
              <Grid item xs={12}>
                {/* <Typography className={classes.title}>Alterar senha</Typography> */}
                <TextField
                  variant="outlined"
                  fullWidth
                  id="old_password"
                  name="old_password"
                  label={i18n("changePassword.oldPassword")}
                  type="password"
                  value={formik.values.old_password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.old_password &&
                    Boolean(formik.errors.old_password)
                  }
                  helperText={
                    formik.touched.old_password && formik.errors.old_password
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  name="password"
                  label={i18n("changePassword.newPassword")}
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password_confirm"
                  name="password_confirm"
                  label={i18n("changePassword.confirmPassword")}
                  type="password"
                  value={formik.values.password_confirm}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password_confirm &&
                    Boolean(formik.errors.password_confirm)
                  }
                  helperText={
                    formik.touched.password_confirm &&
                    formik.errors.password_confirm
                  }
                />
              </Grid>
            </Grid>

            <Button type="submit" className={classes.button} loading={loading}>
              {/* <Button type="submit" className={classes.button} loading={loading}> */}
              {i18n("button.save")}
            </Button>
          </Container >
        </Form>
      )}
    </Formik>
  );

}

const initialValues = {
  old_password: "",
  password: "",
  password_confirm: "",
};

const validate = (values) => {
  const errors = {};

  if (!values.old_password) {
    errors.old_password = "Campo obrigatório *";
    return errors;
  }
  if (!values.password) {
    errors.password = "Campo obrigatório *";
    return errors;
  }
  if (!values.password_confirm) {
    errors.password_confirm = "Campo obrigatório *";
    return errors;
  }

  if (values.password !== values.password_confirm) {
    errors.password_confirm = "Senhas diferentes";
    return errors;
  }

  return errors;
};

ChangePassword.propTypes = {
  classes: PropTypes.object,
};

export default withStyles((theme) => ({
  container: {
    justifyContent: "space-between",
    flexDirection: "column",
    display: "flex",
    alignItems: "center"
  },
  title: {
    fontSize: 36,
    color: theme.palette.secondary.main,
    marginBottom: 48,
  },
  button: {
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  flex: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
  form: {
    width: "100",
    height: "100%",
  },
  formContainer: {
    width: "50%",
    [theme.breakpoints.down("lg")]: {
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  }
}))(ChangePassword);
