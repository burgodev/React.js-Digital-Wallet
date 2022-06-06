import React, { useState, useMemo } from "react";
import { useHistory } from "react-router";

import { Formik, Form } from "formik";
import { withStyles, TextField, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import loginBackground from "../../../../assets/images/loginBackground.jpg";

import {
  Typography,
  Button,
  Flex,
  Container,
  Card,
  SelectCountry,
  SelectState,
  SelectCity,
  Stepper,
  CepTextField,
} from "../../../../_common/components";
import { useSnackbar } from "../../../../_common/hooks";
import logoSelect from "../../../../assets/images/select-logo.png";

const ComplementaryProfile = ({ classes }) => {
  const history = useHistory();
  const [activeStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openSnackbar] = useSnackbar();

 

  const handleSubmit = async (values) => {
    try {
      localStorage.setItem("userInfoComplementary", JSON.stringify(values));
      history.push("/register_manager_upload");
    } catch (e) {
      openSnackbar(e.response.data.message, "error")
    } finally {
      setLoading(false);
    }
  };

  const getBasicData = useMemo(() => {
    return JSON.parse(localStorage.getItem("userInfo"));
  }, []);

  const initialValues = {
    first_name: getBasicData.first_name,
    last_name: getBasicData.last_name,
    document_number: "",
    birth_date: "",
    phone_number: "",
    address: {
      cep: "",
      number: "",
      street: "",
      city: "",
      state: "",
      country_id: "",
      neighborhood: "",
      complement: "",
    },
  };

  return (
    <Container className={classes.container}>
      <Flex center>
        <img src={logoSelect} alt="Logo" className={classes.logoSelect} />
      </Flex>

      <Flex center className={classes.flexStepper}>
        <Stepper steps={STEPS} activeStep={activeStep} width="60%" />
      </Flex>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validate}
      >
        {(formik) => (
          <Form>
            <Card className={classes.card}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography className={classes.title}>
                    Personal Data
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="textfield-first_name"
                    name="first_name"
                    label="Nome"
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.first_name &&
                      Boolean(formik.errors.first_name)
                    }
                    helperText={
                      formik.touched.first_name && formik.errors.first_name
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="textfield-last_name"
                    type="last_name"
                    name="last_name"
                    label="Sobrenome"
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.last_name &&
                      Boolean(formik.errors.last_name)
                    }
                    helperText={
                      formik.touched.last_name && formik.errors.last_name
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="textfield-document_number"
                    name="document_number"
                    label="Documento"
                    InputLabelProps={{ shrink: true }}
                    size="small"
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
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="textfield-birth_date"
                    name="birth_date"
                    label="Data de nascimento"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={formik.values.birth_date}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.birth_date &&
                      Boolean(formik.errors.birth_date)
                    }
                    helperText={
                      formik.touched.birth_date && formik.errors.birth_date
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography className={classes.title}>
                    Adress and contact information
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <CepTextField initialValue={formik.values.address?.cep} />
                </Grid>

                <Grid item xs={4}>
                  <SelectCountry
                    formik={formik}
                    onChange={(e) =>
                      formik.setFieldValue("address.country_id", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <SelectState
                    formik={formik}
                    onChange={(e) =>
                      formik.setFieldValue("address.state", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <SelectCity
                    formik={formik}
                    onChange={(e) =>
                      formik.setFieldValue("address.city", e.target.value)
                    }
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    id="textfield-neighborhood"
                    name="address.neighborhood"
                    label="Bairro"
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

                <Grid item xs={4}>
                  <TextField
                    size="small"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    id="address.street"
                    name="address.street"
                    label="Rua"
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
                    label="Número"
                    value={formik.values.address?.number}
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
                    label="Complemento"
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
                    variant="outlined"
                    fullWidth
                    id="textfield-phone_number"
                    type="phone_number"
                    name="phone_number"
                    label="Telefone"
                    InputLabelProps={{ shrink: true }}
                    size="small"
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
              <Flex center>
                <Button
                  className={classes.button}
                  type="submit"
                  loading={loading}
                >
                  Próximo
                </Button>
              </Flex>
            </Card>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

const STEPS = [
  {
    id: 1,
    label: "Profile Data",
  },
  {
    id: 2,
    label: "Document upload",
  },
];

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

  return errors;
};

export default withStyles((theme) => ({
  container: {
    height: "100vh",
    width: "100vw",
    backgroundImage: `linear-gradient(to right, #eaeaea , rgb(255 255 255 / 0%)),url(${loginBackground})`,
    backgroundSize: "contain",
    backgroundPositionX: "right",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5vh 10vw 10vh",
  },

  card: {
    padding: 32,
    width: "35vw",
    backgroundColor: "white",
    borderRadius: "15px",
    boxShadow: "-1px 1px 14px -3px rgba(0,0,0,0.20)",
    display: "flex",
    flexDirection: "column",
  },
  logoSelect: {
    width: 150,
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: 500,
  },
  button: {
    marginTop: 24,
  },
  flexStepper: {
    marginTop: 48,
  },
}))(ComplementaryProfile);

ComplementaryProfile.propTypes = {
  classes: PropTypes.object,
};
