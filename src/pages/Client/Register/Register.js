import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import * as yup from "yup";
import { useDispatch } from 'react-redux'
import { saveUser } from "../../../store/user"

import loginBackground from "../../../assets/images/loginBackground.jpg";
import { withStyles, TextField, Checkbox } from "@material-ui/core";
import PropTypes from "prop-types";
import { theme } from "../../../_common/utils/theme";
import {
  Typography,
  Button,
  Flex,
  Container,
  Card,
} from "../../../_common/components";
import { useSnackbar } from "../../../_common/hooks";

// import successIcon from "../../../assets/images/checked-simple-outline.gif";
import api from "../../../services/api";

function RegisterPersonal({ classes }) {
  const dispatch = useDispatch()
  const i18n = useTranslation().t;
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [openSnackbar] = useSnackbar();
  const [acceptanceTerm, setAcceptanceTerm] = useState();

  const { manager_code } = useParams();

  const validationSchema = yup.object({
    firstName: yup
      .string()
      .required("First name is required")
      .matches(/^[a-zA-Z]+$/, "Cannot contain special characters or spaces"),
    lastName: yup
      .string()
      .required("Last name is required")
      .matches(
        /^[a-zA-Z]+$/,
        "Cannot contain special characters, numbers or spaces"
      ),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    confirmation: yup
      .boolean()
      .oneOf([true], "It's necessary accept the terms"),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      confirmation: false
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
        password_confirm: values.confirmPassword,
        acceptance_term_id: acceptanceTerm?.id,
        accepted: true,
        nationality_id: "BR",
        role: "Client",
      };
      if (manager_code) {
        data.manager_code = manager_code
      }

      setLoading(true);

      api
        .post("/auth/client/register", data)
        .then((res) => {
          setRegisterSuccess(true);
          setLoading(false);
          dispatch(saveUser(data));
          history.push("/");
        })
        .catch((error) => {
          setRegisterSuccess(false);
          openSnackbar(error.response.data.message, "error")
          setLoading(false);
        });
    },
  });

  const getAcceptanceTerm = async () => {
    const { data } = await api.get("auth/acceptance-term");
    setAcceptanceTerm(data.payload[0]);
  };

  useEffect(() => {
    getAcceptanceTerm();
  }, []);

  return (
    <Container className={classes.container}>
      <Flex className={classes.flex}>
        <Card className={classes.formRegisterContainer}>
          {/* <Flex
            flexDirection="column"
            alignItems="center"
            className={
              registerSuccess
                ? classes.formRegisterSuccess
                : classes.displayNone
            }
          >
            <img src={successIcon} alt="" style={{ width: "80px" }} />
            <Typography className={classes.successMessageRegister}>
              Conta criada com sucesso
            </Typography>
            <Typography style={{ marginBottom: "20px" }}>
              Faça agora seu primeiro acesso a plataforma.
            </Typography>
            <Typography
              style={{ cursor: "pointer" }}
              element="a"
              url="/"
              color={theme.colors.primary}
              fontWeight={700}
            >
              FAZER LOGIN
            </Typography>
          </Flex> */}
          <form
            onSubmit={formik.handleSubmit}
            className={registerSuccess ? classes.displayNone : ""}
          >
            <Typography
              className={classes.title}
            >

              {i18n("register.title")}
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              style={{ marginTop: "25px" }}
              className={classes.inputFields}
              id="firstName"
              name="firstName"
              label={i18n("register.firstName")}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              fullWidth
              variant="outlined"
              className={classes.inputFields}
              id="lastName"
              name="lastName"
              label={i18n("register.lastName")}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
              fullWidth
              variant="outlined"
              className={classes.inputFields}
              id="email"
              name="email"
              label={i18n("register.email")}
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
              label={i18n("register.password")}
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              fullWidth
              variant="outlined"
              className={classes.inputFields}
              id="confirmPassword"
              name="confirmPassword"
              label={i18n("register.confirmPassword")}
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            <Flex className={classes.acceptanceTermBox}>
              <Flex className={classes.acceptanceTerms}>
                <Checkbox
                  size="small"
                  checked={formik.values.confirmation}
                  name="confirmation"
                  value={formik.values.confirmation}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.confirmation &&
                    Boolean(formik.errors.confirmation)
                  }
                />
                <Typography
                  className={classes.acceptanceTermText}
                  fontSize="0.9rem"
                  color={theme.colors.text}
                >
                  {i18n("register.register_terms_1")}
                  <Typography
                    element="a"
                    target="_blank"
                    url="/terms-of-use"
                    className={classes.termsLinks}
                  >
                    {" "}
                    {i18n("register.register_terms_2")}{" "}
                  </Typography>
                  {i18n("register.register_terms_3")}
                  <Typography
                    element="a"
                    target="_blank"
                    url="/terms-of-use"
                    className={classes.termsLinks}
                  >
                    {" "}
                    {i18n("register.register_terms_4")}
                  </Typography>
                  .
                </Typography>
              </Flex>
            </Flex>

            {formik.errors.confirmation && formik.touched.confirmation && (
              <Flex>
                <Typography className={classes.typography2}>
                  {i18n("validation.required")}
                </Typography>
              </Flex>
            )}

            <Flex flexDirection="column">
              <Button type="submit" width="100%" loading={loading}>
                {i18n("register.signIn")}
              </Button>
              <Button variant="text" width="100%" loading={loading} onClick={() => history.push("/")} className={classes.button}>
                {i18n("register.alreadyClient")}
              </Button>
            </Flex>
          </form>
        </Card>
      </Flex>
    </Container>
  );
}

export default withStyles((theme) => ({
  positionRelative: {
    position: "relative",
  },
  displayNone: {
    display: "none",
  },
  headerRegisterContainer: {
    fontFamily: "Poppins, sans-serif",
  },
  linkHeaderRegister: {
    color: theme.colors.text,
    textDecoration: "none",
    fontSize: "1.4rem",
    fontWeight: 500,
    "&.active": {
      borderBottom: `6px solid ${theme.colors.primary}`,
    },
    margin: "0 45px 25px 0",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  container: {
    height: "100vh",
    width: "100vw",
    backgroundImage: `linear-gradient(to right, #eaeaea , rgb(255 255 255 / 0%)),url(${loginBackground})`,
    backgroundSize: "contain",
    backgroundPositionX: "right",
    paddingLeft: "0",
    display: "grid",
    grid: "100% / 50% 50%",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
  },
  flex: {
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },

  formRegisterSuccess: {
    maxWidth: "500px",
    backgroundColor: "white",
    padding: "100px 45px",
    borderRadius: "15px",
    [theme.breakpoints.only("lg")]: {
      maxWidth: "450px",
    },
    [theme.breakpoints.only("md")]: {
      maxWidth: "400px",
      padding: "36px 15px",
    },
    [theme.breakpoints.only("sm")]: {
      maxWidth: "450px",
    },
    [theme.breakpoints.only("xs")]: {
      padding: "50px 15px",
    },
  },

  successMessageRegister: {
    fontSize: "1.6rem",
    lineHeight: "25px",
    color: theme.colors.text,
    fontWeight: 700,
    margin: "20px 0 50px 0",
  },

  formRegisterContainer: {
    maxWidth: "500px",
    backgroundColor: "white",
    padding: " 32px 24px",
    borderRadius: "15px",
    [theme.breakpoints.only("lg")]: {
      maxWidth: "450px",
    },
    [theme.breakpoints.only("md")]: {
      maxWidth: "400px",
      padding: "36px 15px",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "450px",
      width: 360,
    },
    [theme.breakpoints.only("xs")]: {
      padding: "50px 15px",
      maxWidth: "100%",
    },
  },
  titleRegisterForm: {
    fontWeight: 600,
    fontSize: "2.3rem",
    margin: "0 0 50px",
    color: theme.colors.text,
    [theme.breakpoints.only("lg")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.only("sm")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "1.8rem",
    },
  },
  logoImgTop: {
    width: "150px",
    margin: "0px 0px 25px",
    [theme.breakpoints.only("lg")]: {
      display: "none",
    },
    [theme.breakpoints.only("md")]: {
      display: "none",
    },
    [theme.breakpoints.only("sm")]: {},
  },

  logoImgRight: {
    width: "280px",
    margin: "0px 0px 50px",
    [theme.breakpoints.only("sm")]: {
      display: "none",
    },
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
  inputFields: {
    fontWeight: "400",
    fontSize: "0.9rem",
    margin: "0px 0px 8px 0px",
  },
  termsContainer: {
    textAlign: "center",
    margin: "5px 0 35px 0",
  },
  termsLinks: {
    color: theme.colors.primary,
    fontSize: "0.90rem",
    fontWeight: 500,
  },
  registerLogoAndDescription: {
    [theme.breakpoints.only("sm")]: {
      display: "none",
    },
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
  button: {
    marginTop: 8,
  },
  acceptanceTermBox: {
    flexDirection: "column-reverse",
  },
  acceptanceTerms: {
    marginTop: "8px",
    marginBottom: "15px",
  },
  acceptanceTermText: {
    textAlign: "left",
    padding: 8
  },
  typographyBox: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  typography2: {
    color: theme.palette.error.main,
    fontSize: 12,
    marginBottom: 16
  },
  title: {
    textAlign: "left",
    fontSize: "2rem",
    color: theme.colors.text,
    fontWeight: 600,
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  }
}))(RegisterPersonal);

RegisterPersonal.propTypes = {
  classes: PropTypes.object,
};
