import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DialogTitle, DialogContent, DialogActions, withStyles, TextField, MenuItem, InputAdornment } from "@material-ui/core";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";

import {
  Flex,
  Card,
  Button,
  Typography,
  Loading,
} from "../../../../../_common/components";
import api from "../../../../../services/api";
import {
  TransactionEntityType,
  TransactionTypes,
} from "../../../../../services/data/transactionTypes";
import { useSnackbar } from "../../../../../_common/hooks";

const ModalTransfer = ({ classes, onClose, initial, balance }) => {
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [formData, setFormData] = useState(initialValues);
  const [type, setType] = useState(null);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [openSnackbar] = useSnackbar();
  const i18n = useTranslation().t;

  useEffect(() => {
    setFormData({ ...formData, ...initial });
    setAvailableBalance(balance);
    const fetchData = async () => {
      const { data } = await api.get("/client/transaction/options");
      setOptions(data.payload);
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (options.length < 1 || !formData) return;
    const newData = {};

    if (formData.to && !formData.from) {
      newData.from = options.find((o) => o.type === "WALLET")?.id || "";
    } else if (formData.from && !formData.to) {
      newData.to = options.find((o) => o.type === "WALLET")?.id || "";
    }

    setFormData({
      ...formData,
      ...newData,
    });
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => findTransactionType(formData), [formData]);

  const findTransactionType = async (values) => {
    const fromType = getType(values.from);
    const toType = getType(values.to);

    if (
      fromType === TransactionEntityType.WALLET &&
      toType === TransactionEntityType.OPERATION_ACCOUNT
    ) {
      setType(TransactionTypes.APPLICATION);

      const fetchWalletBalance = async () => {
        const { data } = await api.get("/client/wallet/balance");
        setAvailableBalance(data.payload.balance);
      };

      fetchWalletBalance();
    } else if (
      fromType === TransactionEntityType.OPERATION_ACCOUNT &&
      toType === TransactionEntityType.WALLET
    ) {
      setType(TransactionTypes.RESCUE);
    } else if (
      fromType === TransactionEntityType.OPERATION_ACCOUNT &&
      toType === TransactionEntityType.OPERATION_ACCOUNT
    ) {
      setType(TransactionTypes.TRANSFER);
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.from) {
      errors.from = "Campo obrigatório *";
    }
    if (!values.to) {
      errors.to = "Campo obrigatório *";
    }
    if (values.to === values.from) {
      errors.to = "Origem e destino não podem ser os mesmos";
    }
    if (!values.amount || values.amount <= 0) {
      errors.amount = "Campo obrigatório *";
    } else if (values.amount > availableBalance) {
      errors.amount = "Saldo insuficiente";
    }

    return errors;
  };

  const getType = (id) => options.find((o) => o.id === id)?.type;
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      let url = null;

      if (type === TransactionTypes.APPLICATION) {
        url = "/client/transaction/application";
      } else if (type === TransactionTypes.RESCUE) {
        url = "/client/transaction/rescue";
      } else if (type === TransactionTypes.TRANSFER) {
        url = "/client/transaction/transfer";
      }
      if (url == null) {
        throw new Error("Tipo de transferencia nao aceito");
      }

      const { data } = await api.post(url, values);

      if (!data.error) {
        openSnackbar(`${data.message}`, "success");
      }
    } catch (e) {
      openSnackbar(e.response.data.message, "error");
    } finally {
      setLoading(false);
      onClose();
    }
  };

  if (loading) return (
    <Card className={classes.card}>
      <Loading isLoading />
    </Card>
  );

  return (
    <Card className={classes.card}>
      <DialogTitle disableTypography className={classes.title}>
        <Typography fontSize={28} fontWeight={600}>
          {" "}
          {initial.to
            ? i18n("modalTransfer.application")
            : i18n("modalTransfer.withdrawal")}
        </Typography>
        <Typography fontWeight={500}> {initial.name}</Typography>
      </DialogTitle>
      <Formik
        initialValues={formData}
        onSubmit={handleSubmit}
        validate={validate}
      >
        {(formik) => (
          <Form>
            <DialogContent>
              <Flex flexDirection="column">
                <TextField
                  fullWidth
                  variant="outlined"
                  className={classes.textfield}
                  InputLabelProps={{ shrink: true }}
                  id="from"
                  name="from"
                  select
                  label={i18n("modalTransfer.from")}
                  size="small"
                  value={formik.values.from}
                  onChange={formik.handleChange}
                  error={formik.touched.from && Boolean(formik.errors.from)}
                  helperText={formik.touched.from && formik.errors.from}
                  disabled={!!formik.values.from}
                >
                  {options
                    .filter(({ id }) => id !== formik.values.to)
                    .map(({ id, name }) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                </TextField>

                <TextField
                  fullWidth
                  disabled={!!formik.values.to}
                  variant="outlined"
                  className={classes.textfield}
                  InputLabelProps={{ shrink: true }}
                  id="to"
                  name="to"
                  label={i18n("modalTransfer.to")}
                  size="small"
                  value={formik.values.to}
                  onChange={formik.handleChange}
                  error={formik.touched.to && Boolean(formik.errors.to)}
                  helperText={formik.touched.to && formik.errors.to}
                  select
                >
                  {options
                    .filter(({ id }) => id !== formik.values.from)
                    .map(({ id, name }) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                </TextField>

                <TextField
                  fullWidth
                  variant="outlined"
                  className={classes.textfield}
                  InputLabelProps={{ shrink: true }}
                  type="number"
                  id="amount"
                  name="amount"
                  label={i18n("modalTransfer.value")}
                  size="small"
                  value={Number(formik.values.amount)}
                  onChange={formik.handleChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  error={
                    formik.touched.amount && Boolean(formik.errors.amount)
                  }
                  helperText={formik.touched.amount && formik.errors.amount}
                />
              </Flex>
            </DialogContent>
            <DialogActions>
              <Button margin="8px auto 0" type="submit" loading={loading}>
                {i18n("button.transfer")}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

ModalTransfer.propTypes = {
  classes: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  initial: PropTypes.object,
};

const initialValues = {
  from: "",
  to: "",
  amount: 0,
};

export default withStyles((theme) => ({
  title: {
    padding: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    flexDirection: "column",
    marginBottom: 12,
  },
  card: {
    width: 480,
    padding: "48px 40px 32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  textfield: {
    margin: "8px",
  },
}))(ModalTransfer);
