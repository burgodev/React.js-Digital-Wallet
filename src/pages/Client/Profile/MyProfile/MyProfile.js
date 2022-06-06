import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import { withStyles, TextField, Grid } from "@material-ui/core";
import PropTypes from "prop-types";

import {
  Container,
  Button,
  SelectCountry,
  SelectState,
  SelectCity,
  CepTextField,
  Loading,
  Navigation,
} from "../../../../_common/components";
import { useSnackbar, useNavigation } from "../../../../_common/hooks";
import api from "../../../../services/api";

const MyProfile = ({ classes }) => {
  const i18n = useTranslation().t;
  const [loading, setLoading] = useState(false);
  const navList = useNavigation("profile");
  const [user, setUser] = useState(null);
  const [openSnackbar] = useSnackbar();

  const getUser = async () => {
    const { data } = await api.get("/user/profile");
    setUser({
      address: {
        country_id: "",
        state: "",
        city: "",
        cep: "",
        street: "",
        number: "",
      },
      countryCode: "55",
      ...data.payload,
      birth_date: data.payload.birth_date?.split("T")[0],
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await api.post("/auth/client/update", values);
      openSnackbar("Alterações salvas com sucesso", "success")
    } catch (e) {
      openSnackbar(e.response.data.message, "error")
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <Loading isLoading size={48} className={classes.loading} />;

  return (
    <Formik initialValues={user} onSubmit={handleSubmit} validate={validate}>
      {(formik) => (
        <Form className={classes.form}>
          <Container className={classes.container} >
            <Navigation navList={navList} initialValue={"profile"} />
            <Grid container spacing={3} className={classes.formContainer}>
              <Grid item xs={12} md={6}>
                <TextField
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  id="first_name"
                  name="first_name"
                  label={i18n("myProfile.name")}
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.first_name && Boolean(formik.errors.first_name)
                  }
                  helperText={
                    formik.touched.first_name && formik.errors.first_name
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  id="last_name"
                  name="last_name"
                  label={i18n("myProfile.lastName")}
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.last_name && Boolean(formik.errors.last_name)
                  }
                  helperText={formik.touched.last_name && formik.errors.last_name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  id="document_number"
                  name="document_number"
                  label={i18n("myProfile.document")}
                  value={formik.values.document_number}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.document_number &&
                    Boolean(formik.errors.document_number)
                  }
                  helperText={
                    formik.touched.document_number &&
                    formik.errors.document_number
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  type="date"
                  id="birth_date"
                  name="birth_date"
                  label={i18n("myProfile.birthDate")}
                  value={formik.values.birth_date}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.birth_date && Boolean(formik.errors.birth_date)
                  }
                  helperText={
                    formik.touched.birth_date && formik.errors.birth_date
                  }
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <CepTextField initialValue={formik.values.address?.cep} />
              </Grid>

              <Grid item xs={12} md={4}>
                <SelectCountry
                  formik={formik}
                  onChange={(e) =>
                    formik.setFieldValue("address.country_id", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <SelectState
                  formik={formik}
                  onChange={(e) =>
                    formik.setFieldValue("address.state", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <SelectCity
                  formik={formik}
                  onChange={(e) =>
                    formik.setFieldValue("address.city", e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  id="textfield-neighborhood"
                  name="address.neighborhood"
                  label={i18n("myProfile.neighborhood")}
                  value={formik.values.address?.neighborhood}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address?.neighborhood &&
                    Boolean(formik.errors.address?.neighborhood)
                  }
                  helperText={
                    formik.touched.address?.neighborhood &&
                    formik.errors.address?.neighborhood
                  }
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  id="address.street"
                  name="address.street"
                  label={i18n("myProfile.street")}
                  value={formik.values.address?.street}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address?.street &&
                    Boolean(formik.errors.address?.street)
                  }
                  helperText={
                    formik.touched.address?.street &&
                    formik.errors.address?.street
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  id="number"
                  name="address.number"
                  label={i18n("myProfile.number")}
                  value={Number(formik.values.address?.number)}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address?.number &&
                    Boolean(formik.errors.address?.number)
                  }
                  helperText={
                    formik.touched.address?.number &&
                    formik.errors.address?.number
                  }
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  id="textfield-complement"
                  name="address.complement"
                  label={i18n("myProfile.complement")}
                  value={formik.values.address?.complement}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address?.complement &&
                    Boolean(formik.errors.address?.complement)
                  }
                  helperText={
                    formik.touched.address?.complement &&
                    formik.errors.address?.complement
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  id="countryCode"
                  name="countryCode"
                  label="DDI"
                  type="countryCode"
                  value={formik.values.countryCode}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.countryCode &&
                    Boolean(formik.errors.countryCode)
                  }
                  helperText={
                    formik.touched.countryCode && formik.errors.countryCode
                  }
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  id="phone_number"
                  name="phone_number"
                  label={i18n("myProfile.phoneNumber")}
                  type="phone_number"
                  value={formik.values.phone_number}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phone_number &&
                    Boolean(formik.errors.phone_number)
                  }
                  helperText={
                    formik.touched.phone_number && formik.errors.phone_number
                  }
                />
              </Grid>
            </Grid>

            <Button type="submit" className={classes.button} loading={loading}>
              {i18n("button.save")}
            </Button>

          </Container >
        </Form>
      )
      }
    </Formik>

  );
}

const validate = (values) => {
  const errors = {};

  if (!values.first_name) {
    errors.first_name = "Campo obrigatório *";
    return errors;
  }

  if (!values.last_name) {
    errors.last_name = "Campo obrigatório *";
    return errors;
  }

  if (!values.document_number) {
    errors.document_number = "Campo obrigatório *";
    return errors;
  }

  if (!values.birth_date) {
    errors.birth_date = "Campo obrigatório *";
    return errors;
  }

  if (!values.address?.country_id) {
    errors.address = {
      ...errors.address,
      country_id: "Campo obrigatório *"
    }
    return errors;
  }

  if (!values.address?.state) {
    errors.address = {
      ...errors.address,
      state: "Campo obrigatório *"
    }
    return errors;
  }

  if (!values.address?.city) {
    errors.address = {
      ...errors.address,
      city: "Campo obrigatório *"
    }

    return errors;
  }

  if (!values.address?.cep) {
    errors.address = {
      ...errors.address,
      cep: "Campo obrigatório *"
    }
    return errors;
  }

  if (!values.address?.street) {
    errors.address = {
      ...errors.address,
      street: "Campo obrigatório *"
    }
    return errors;
  }

  if (!values.phone_number) {
    errors.phone_number = "Campo obrigatório *";
    return errors;
  }

  if (!values.countryCode) {
    errors.countryCode = "Campo obrigatório *";
    return errors;
  }

  if (!values.address.number) {
    errors.address.phone_number = "Campo obrigatório *";
    return errors;
  }

  return errors;
};

MyProfile.propTypes = {
  classes: PropTypes.object,
};

export default withStyles((theme) => ({
  container: {
    justifyContent: "space-between",
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    height: "90vh"
  },
  title: {
    fontSize: 36,
    color: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    height: "90vh",
  },
  button: {
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "90%"
    },
  },
  loading: { height: "100vh" },
  formContainer: {
    width: "50%",
    [theme.breakpoints.down("lg")]: {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "16px 0 8px"
    },
  }
}))(MyProfile);
