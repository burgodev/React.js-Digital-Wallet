import React, { useState } from "react";
import { withStyles, TextField, FormHelperText, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// import botMoneyLogo from "../../../../assets/images/bot-horizontal.png";
import mt5logo from "../../../../assets/images/mt5-horizontal.png";
import {
  Flex,
  Typography,
  Button,
  Container,
  Card,
  Navigation
} from "../../../../_common/components";
import api from "../../../../services/api";
import { VIRTUAL_BALANCE_OPTIONS, ACCOUNT_TYPE, ACCOUNT_CATEGORY, METATRADER_TYPE, initialValues, validate } from "./utils"
import { useSnackbar } from "../../../../_common/hooks"
import { ACCOUNT_LEVERAGE } from "../../../../_common/utils/constants"
import { formatCurrency } from "../../../../_common/utils/functions"
import ModalCreateAccountConfirmation from "../components/ModalCreateAccountConfirmation"

const CreateAccount = ({ classes }) => {
  const i18n = useTranslation().t;
  const { accountType } = useParams();
  const [loading, setLoading] = useState(false);
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false);
  const [openSnackbar] = useSnackbar();

  const handleSubmit = async (values) => {
    const dataAccount = {
      name: values.name,
      is_demo: accountType.toUpperCase() === ACCOUNT_TYPE.REAL ? false : true,
      operation_type: values.category,
      config: {
        spread_type: values.type,
        leverage: values.leverage
      },
      balance: values.balance
    }
    console.log("dataAccount", dataAccount)
    try {
      setLoading(true);
      await api.post("/operation-account", dataAccount);
      setOpenModalConfirmation(true)
    } catch (e) {
      openSnackbar(e.response.data.message, "error")
    } finally {
      setLoading(false)

    }
  };

  const navList = [
    {
      id: "createAccount",
      text: "Criar conta",
      link: accountType.toUpperCase() === ACCOUNT_TYPE.REAL ? "/client/accounts/create-account/real" : "/client/accounts/create-account/demo",
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={(values) => validate(values, accountType)}
    >
      {(formik) => (
        <Form className={classes.form}>
          <Container className={classes.container}>
            <Navigation navList={navList} initialValue={"createAccount"} />
            <Card className={classes.card}>
              <Flex center flexDirection="column">
                <TextField
                  fullWidth
                  variant="outlined"
                  className={classes.textfield}
                  style={{ marginTop: formik.values.category === ACCOUNT_CATEGORY.METATRADER ? 72 : 96 }}
                  InputLabelProps={{ shrink: true }}
                  id="name"
                  name="name"
                  label={i18n("createAccount.accountName")}
                  size="small"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.name && Boolean(formik.errors.name)
                  }
                  helperText={formik.touched.name && formik.errors.name}
                  inputProps={{
                    maxLength: 20,
                  }}
                />

                <Typography margin="8px 0 8px" fontSize={20}>{i18n("createAccount.currency")}</Typography>
                <Typography fontSize={32} className={classes.currency} >USDX</Typography>
                <Typography className={classes.typography}>{i18n("createAccount.category")}</Typography>
                <ToggleButtonGroup
                  value={formik.values.category}
                  name="category"
                  exclusive
                  onChange={(e, value) => formik.setFieldValue("category", value)}
                  id="toggle-category"

                >
                  {/* <ToggleButton className={classes.toggleButton} value={ACCOUNT_CATEGORY.BOTMONEY} >
                    <img
                      src={botMoneyLogo}
                      alt="BOTMONEY"
                      className={classes.img}
                      width={'136px'}
                      height={'39px'}
                    />
                  </ToggleButton> */}
                  <ToggleButton className={classes.toggleButton} value={ACCOUNT_CATEGORY.METATRADER}>
                    <img
                      src={mt5logo}
                      alt="metatrader"
                      className={classes.img}
                      width={'136px'}
                      height={'39px'}
                    />
                  </ToggleButton>
                </ToggleButtonGroup>
                {formik.touched.category && Boolean(formik.errors.category) &&
                  <FormHelperText id="helper-text-category" className={classes.helperText}>{i18n("validation.required")}</FormHelperText>}
                {formik.values.category === ACCOUNT_CATEGORY.METATRADER && <>
                  <Typography className={classes.typography}>{i18n("createAccount.type")}</Typography>
                  <ToggleButtonGroup
                    value={formik.values.type}
                    name="type"
                    exclusive
                    onChange={(e, value) => formik.setFieldValue("type", value)}
                    id="toggle-category"
                  >
                    <ToggleButton className={classes.toggleButton} value={METATRADER_TYPE.STANDARD} >
                      Standard Account
                    </ToggleButton>
                    {/* <ToggleButton className={classes.toggleButton} value={METATRADER_TYPE.RAW_SPREAD}>
                      Raw Spread
                    </ToggleButton> */}
                  </ToggleButtonGroup>
                  {formik.touched.type && Boolean(formik.errors.type) &&
                    <FormHelperText id="helper-text-category" className={classes.helperText}>{i18n("validation.required")}</FormHelperText>}
                  <Typography className={classes.typography}>{i18n("createAccount.leverage")}</Typography>
                  <ToggleButtonGroup
                    value={formik.values.leverage}
                    name="leverage"
                    exclusive
                    onChange={(e, value) => formik.setFieldValue("leverage", value)}
                    id="toggle-category"
                  >
                    {ACCOUNT_LEVERAGE.map(({ id, text }) =>
                      <ToggleButton className={`${classes.toggleButton} ${classes.toggleButtonWidth}`} value={id} >
                        {text}
                      </ToggleButton>

                    )}
                  </ToggleButtonGroup>
                  {formik.touched.leverage && Boolean(formik.errors.leverage) &&
                    <FormHelperText id="helper-text-category" className={classes.helperText}>{i18n("validation.required")}</FormHelperText>}
                </>}

                {accountType === "demo" && formik.values.category === ACCOUNT_CATEGORY.METATRADER &&
                  <TextField
                    select
                    fullWidth
                    variant="outlined"
                    className={classes.virtualBalance}
                    InputLabelProps={{ shrink: true }}
                    id="balance"
                    name="balance"
                    label={i18n("createAccount.virtualBalance")}
                    size="small"
                    value={formik.values.balance}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.balance && Boolean(formik.errors.balance)
                    }
                  >
                    {VIRTUAL_BALANCE_OPTIONS.map((value) => <MenuItem value={value}>{formatCurrency(value)}</MenuItem>)}
                  </TextField>
                }

              </Flex>
            </Card>
            <Flex flexDirection="column" className={classes.flexActions}>
              <Button type="submit" loading={loading} width={"100%"}>{i18n("button.createAccount")}</Button>
              <Link to={accountType.toUpperCase() === ACCOUNT_TYPE.REAL ? "/client/accounts/real-account" : "/client/accounts/demo-account"} className={classes.link}>
                <Button variant="text" disabled={loading} className={classes.button}>{i18n("button.back")}</Button>
              </Link>
            </Flex>
            <ModalCreateAccountConfirmation open={openModalConfirmation} onClose={() => setOpenModalConfirmation(false)} accountType={accountType} />
          </Container>
        </Form>
      )
      }
    </Formik >
  );
}

CreateAccount.propTypes = {
  classes: PropTypes.object,
};

export default withStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    flexDirection: "inherit",
    alignItems: "inherit",
    justifyContent: "inherit",
    display: "inherit",
    height: "inherit",
    width: "inherit"
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
  textfield: {
    margin: "8px",
    width: "30%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
  },
  typography: {
    margin: "12px 0 8px",
    fontSize: 20
  },
  link: {
    textDecoration: "none",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignitems: "center"
  },
  toggleButton: {
    borderLeft: "solid 1px rgba(0, 0, 0, 0.12)",
    margin: "0 16px",
    width: 220,
    height: "52px",
    background: theme.palette.white,
    // border: "1px solid #FFFFFF",
    boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 16,
    fontSize: 15,
    fontWeight: 500,
    color: "#333333"
  },
  currency: {
    border: "solid 1px #bdbfc0",
    padding: "0 80px",
    marginBottom: 8,
    background: "white"
  },
  accountType: {
    textTransform: "capitalize"
  },
  img: {
    width: "70%"
  },
  helperText: {
    color: "#f44336",
    marginTop: 8
  },
  virtualBalance: {
    marginTop: 28,
    width: "30%",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
  },
  flexActions: {
    marginTop: 24,
    width: "50% !important",
    [theme.breakpoints.down("sm")]: {
      width: "90% !important"
    },
  },
  button: {
    marginTop: 8,
    width: "100%"
  },
  toggleButtonWidth: {
    width: "150px !important",
    [theme.breakpoints.down("sm")]: {
      width: "75px !important"
    },
  },
  form: {
    width: "100%",
    height: "100%"
  }
}))(CreateAccount);
