import React, { useState, useEffect } from "react";
import { withStyles, InputAdornment } from "@material-ui/core";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import useMediaQuery from '@material-ui/core/useMediaQuery';

import api from "../../../../services/api";
import {
  Button,
  Container,
  Navigation,
  TextField,
  Flex,
  Typography
} from "../../../../_common/components";
import { useSnackbar } from "../../../../_common/hooks";
import { useNavigation } from "../../../../_common/hooks";
import { theme } from "../../../../_common/utils/theme.js";

const NewWithdraw = ({ classes }) => {
  const i18n = useTranslation().t;
  const navList = useNavigation("withdraw");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(false);
  const [openSnackbar] = useSnackbar();
  const matches = useMediaQuery(theme.breakpoints.down('lg'));

  const getCode = async () => {
    try {
      const { data } = await api.get("/client/wallet/balance")
      setBalance(data.payload.balance)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getCode()
  }, [])

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const obj = {
        address: values.address,
        amount: Number(values.amount)
      }
      await api.post("/client/transaction/withdraw", obj);
      openSnackbar("Alterações salvas com sucesso", "success")
    } catch (e) {
      openSnackbar(e.response.data.message, "error")
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navigation navList={navList} initialValue={"newWithdraw"} />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={(values) => validate(values, balance)}
      >
        {(formik) => (
          <Form className={classes.form}>
            <Container className={classes.container}>
              <Flex flexDirection="column" center style={{ margin: "auto" }}>
                <Typography className={classes.margin}> {i18n("newWithdraw.description")} </Typography>
                <TextField
                  variant="outlined"
                  size={matches ? "small" : "medium"}
                  className={classes.textfield}
                  id="textfied-address"
                  name="address"
                  label={i18n("newWithdraw.walletAddress")}
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address &&
                    Boolean(formik.errors.address)
                  }
                  helperText={
                    formik.touched.address && formik.errors.address
                  }
                />

                <TextField
                  variant="outlined"
                  size={matches ? "small" : "medium"}
                  className={classes.textfield}
                  id="textfied-value"
                  name="amount"
                  label={i18n("newWithdraw.value")}
                  type="number"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.amount && Boolean(formik.errors.amount)
                  }
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  helperText={formik.touched.amount && formik.errors.amount}
                />
                <TextField
                  variant="outlined"
                  size={matches ? "small" : "medium"}
                  className={classes.textfield}
                  id="textfied-currency"
                  name="currency"
                  label={i18n("newWithdraw.currency")}
                  value={"USDX"}
                  disabled
                />
              </Flex>
              <Flex flexDirection="column" center>
                <Button
                  type="submit"
                  className={classes.button}
                  loading={loading}
                >
                  {i18n("button.confirm")}
                </Button>
              </Flex>
            </Container>
          </Form>
        )}
      </Formik>
    </>
  );
}

const initialValues = {
  address: "",
  amount: "",
  currency: "",
};

const validate = (values, balance) => {
  const errors = {};

  if (!values.address) {
    errors.address = "Campo obrigatório *";
    return errors;
  }
  if (!values.amount) {
    errors.amount = "Campo obrigatório *";
    return errors;
  }
  if (values.amount > balance) {
    errors.amount = "O valor não pode ser maior que o saldo de sua carteira";
    return errors;
  }

  return errors;
};

NewWithdraw.propTypes = {
  classes: PropTypes.object,
};

export default withStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    width: "100%"
  },
  carouselImages: {
    display: "flex",
    position: "relative",
    zIndex: "10",
    height: "100%",
    alignItems: "center",
    borderRadius: "10px",
    "&:": {
      height: "100%",
    },
    [theme.breakpoints.only("lg")]: {
      width: "100% !important",
      height: "100% !important",
    },
    [theme.breakpoints.down("md")]: {},
  },
  link: {
    textDecoration: "none",
    cursor: "pointer",
  },
  button: {
    marginBottom: 16,
    marginTop: 32,
    width: "40%",
    [theme.breakpoints.down("lg")]: {
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  textfield: {
    margin: "8px",
    width: "40%",
    [theme.breakpoints.down("lg")]: {
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  form: {
    height: "100%"
  },
  margin: {
    marginBottom: 24,
    fontSize: 18
  }
}))(NewWithdraw);
