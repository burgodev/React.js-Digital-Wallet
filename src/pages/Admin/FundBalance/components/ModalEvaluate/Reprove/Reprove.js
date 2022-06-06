import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles, TextField } from "@material-ui/core";
import { Formik, Form } from "formik";

import { Typography, Card, Button, Divider, Flex } from "../../../../../../_common/components";
import { useSnackbar } from "../../../../../../_common/hooks"

PropTypes.propTypes = {
  classes: PropTypes.object,
  item: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

const Reprove = ({ classes, onClose, item}) => {
  const [loading, setLoading] = useState(false)
  const [openSnackbar] = useSnackbar();

  const handleSubmit = (values) => {
    try {
      openSnackbar("Reprovado com sucesso", "success")
      console.log(values)
      console.log(item)
    } catch (e) {
      openSnackbar(e.response.data.message, "error")
    } finally {
      setLoading(false)
      onClose();
    }
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validate}
    >
      {(formik) => (
        <Form className={classes.form}>
          <Card clean className={classes.card}>
            <Flex center flexDirection="column">
              <Typography className={classes.title}>
                Reprovação de saldo</Typography>

              <Typography fontSize={16} margin="16px 0 0">
                Você está reprovando o saldo solicitado deste usuário, por favor, digita o motivo abaixo:
              </Typography>

              <Divider className={classes.divider} margin="4px 0 24px" />
            </Flex>
            <TextField
              id="textfield-reasonReprove"
              label="Motivo"
              multiline
              rows={8}
              variant="outlined"
              name="reason"
              className={classes.textfield}
              value={formik.values.reason}
              onChange={formik.handleChange}
              error={
                formik.touched.reason &&
                Boolean(formik.errors.reason)
              }
              helperText={
                formik.touched.reason &&
                formik.errors.reason
              }
            />
            <Button
              type="submit"
              className={classes.button}
              loading={loading}
            >
              Confirmar
            </Button>
          </Card>
        </Form>
      )}
    </Formik>
  );
};


const initialValues = {
  reason: "",
};

const validate = (values) => {
  const errors = {};

  if (!values.reason) {
    errors.reason = "Campo obrigatório *";
    return errors;
  }

  if (values.reason.length < 10) {
    errors.reason = "Preencha pelo menos 10 caracteres";
    return errors;
  }
};


export default withStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    overflow: "hidden",
    paddingTop: 16
  },
  textfield: {
    width: "100%",
    height: "100%",
    margin: "8px 0 16px",
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
  },
  divider: {
    width: 65,
    height: 6,
    background: theme.palette.main,
    color: theme.palette.main,
    borderRadius: 209,
    opacity: 1,
    border: "none",
  },
  button: {
    marginBottom: 8
  },
}))(Reprove);
