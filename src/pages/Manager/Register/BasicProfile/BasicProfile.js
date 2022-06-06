import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import * as yup from "yup";
import { withStyles, TextField, Checkbox } from "@material-ui/core";

import loginBackground from "../../../../assets/images/loginBackground.jpg";
import PropTypes from "prop-types";
import { theme } from "../../../../_common/utils/theme";
import {
  Typography,
  Button,
  Flex,
  Container,
  Card,
} from "../../../../_common/components";
import { useSnackbar } from "../../../../_common/hooks";
import successIcon from "../../../../assets/images/checked-simple-outline.gif";
import api from "../../../../services/api";

const RegisterBasicProfile = ({ classes }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { manager_code } = useParams();

  const [loading, setLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [acceptanceTerm, setAcceptanceTerm] = useState();
  const [openSnackbar] = useSnackbar();

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
    confirmation: yup
      .boolean()
      .oneOf([true], "It's necessary accept the terms"),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      confirmation: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const dataUser = {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        nationality_id: "BR",
        role: "Manager",
        
      };
      if (manager_code) {
        dataUser.manager_code = manager_code;
      }
      setLoading(true);
      try {
        const { data } = await api.post("/auth/manager/verify_email", dataUser);
        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(dataUser));
        localStorage.setItem(
          "acceptance-term",
          JSON.stringify({
            acceptance_term_id: acceptanceTerm.id,
            accepted: true,
          })
        );
        history.push("/register_manager_complementary");
      } catch (error) {
        setRegisterSuccess(false);
        openSnackbar(error.response.data.message, "error");
      } finally {
        setLoading(false);
      }
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
    <>
      <Container className={classes.container}>
        <Flex className={classes.flex}>
          <Card className={classes.formRegisterContainer}>
            <Flex
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
            </Flex>
            <form
              onSubmit={formik.handleSubmit}
              className={registerSuccess ? classes.displayNone : ""}
            >
              <Typography
                textAlign="left"
                fontSize="2rem"
                color={theme.colors.text}
                fontWeight={600}
              >
                Personal Account
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                style={{ marginTop: "25px" }}
                className={classes.inputFields}
                id="firstName"
                name="firstName"
                label="First name"
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
                label="Last name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
              <TextField
                fullWidth
                variant="outlined"
                className={classes.inputFields}
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
                    {t("registerAccountPage.register_terms_1")}
                    <Typography
                      element="a"
                      target="_blank"
                      url="/terms-of-use"
                      className={classes.termsLinks}
                    >
                      {" "}
                      {t("registerAccountPage.register_terms_2")}{" "}
                    </Typography>
                    {t("registerAccountPage.register_terms_3")}
                    <Typography
                      element="a"
                      target="_blank"
                      url="/terms-of-use"
                      className={classes.termsLinks}
                    >
                      {" "}
                      {t("registerAccountPage.register_terms_4")}
                    </Typography>
                    .
                  </Typography>
                </Flex>
                {formik.errors.confirmation && formik.touched.confirmation && (
                  <Flex className={classes.typographyBox}>
                    <Typography className={classes.typography2}>
                      Campo obrigatório *
                    </Typography>
                  </Flex>
                )}
              </Flex>

              {/* <Typography for="scales" fontSize={14}>
                Eu concordo com os Termos e Condições e com a Política de
                Privacidade
              </Typography> */}

              <Flex flexDirection="column">
                <Button type="submit" width="100%" loading={loading}>
                  Cadastre-se
                </Button>
                <Button
                  variant="text"
                  width="100%"
                  loading={loading}
                  onClick={() => history.push("/")}
                  className={classes.button}
                >
                  Já sou gestor
                </Button>
              </Flex>
            </form>
          </Card>
        </Flex>
      </Container>
    </>
  );
};

export default withStyles((theme) => ({
  displayNone: {
    display: "none",
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
    padding: "50px 25px 32px",
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
  },
  typographyBox: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  typography2: {
    color: "red",
  },
}))(RegisterBasicProfile);

RegisterBasicProfile.propTypes = {
  classes: PropTypes.object,
};
