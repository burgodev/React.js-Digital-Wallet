import React, { useState } from "react";
import { Divider, withStyles, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import {
  FiUpload,
  FiCheck,
  FiRotateCcw,
  FiRotateCw,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

import { Typography, Flex, Button } from "../../../../_common/components";
import selectLogoTest from "../../../../assets/images/select-logo.png";
import { Formik, Form } from "formik";
import UserNavigation from "../components/UserNavigation/UserNavigation";

PropTypes.propTypes = {
  classes: PropTypes.object,
};

const UserData = ({ classes }) => {
  const [rotation, setRotation] = useState(0);

  const documentImageRotateRight = (e) => {
    let newRotation = rotation + 90;
    if (newRotation >= 360) {
      newRotation = -360;
    }
    setRotation(newRotation);
  };
  const documentImageRotateLeft = (e) => {
    let newRotation = rotation - 90;
    if (newRotation >= 360) {
      newRotation = -360;
    }
    setRotation(newRotation);
  };

  const handleSubmit = async (values) => {
    console.log("v", values);
    // try {
    //   setLoading(true);
    //   const { data } = await api.post(`/signin`, values);
    //   dispatch(saveUser(data));
    //   navigate("/assinaturas/novas-assinaturas");
    // } catch (error) {
    //   setOpenErrorSnackbar(true);
    //   console.log(error.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validate}
    >
      {(formik) => {
        return (
          <Form className={classes.form}>
            <div className={classes.mainGrid}>
              <UserNavigation style={{ gridColumn: "span 3" }} />
              <div className={classes.grid}>
                {/* <Typography className={classes.title}>Documentos</Typography> */}
                <TextField
                  className={classes.textfield}
                  variant="outlined"
                  fullWidth
                  id="value"
                  name="firstName"
                  size="small"
                  label="First name"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
                <TextField
                  className={classes.textfield}
                  variant="outlined"
                  fullWidth
                  id="value"
                  name="lastName"
                  size="small"
                  label="Last name"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
                <TextField
                  className={classes.textfield}
                  variant="outlined"
                  fullWidth
                  id="value"
                  name="ssn"
                  size="small"
                  label="SSN"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.ssn}
                  onChange={formik.handleChange}
                  error={formik.touched.ssn && Boolean(formik.errors.ssn)}
                  helperText={formik.touched.ssn && formik.errors.ssn}
                />
                <TextField
                  className={classes.textfield}
                  variant="outlined"
                  fullWidth
                  id="value"
                  name="birthday"
                  size="small"
                  label="Birthday"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.birthday}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.birthday && Boolean(formik.errors.birthday)
                  }
                  helperText={formik.touched.birthday && formik.errors.birthday}
                />
                <TextField
                  className={classes.textfield}
                  variant="outlined"
                  fullWidth
                  id="value"
                  name="country"
                  size="small"
                  label="Country"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.country && Boolean(formik.errors.country)
                  }
                  helperText={formik.touched.country && formik.errors.country}
                />
                <TextField
                  className={classes.textfield}
                  variant="outlined"
                  fullWidth
                  id="value"
                  name="state"
                  size="small"
                  label="State"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                />
                <TextField
                  className={classes.textfield}
                  variant="outlined"
                  fullWidth
                  id="city"
                  name="city"
                  size="small"
                  label="City"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
                <TextField
                  className={classes.textfield}
                  variant="outlined"
                  fullWidth
                  id="adress"
                  name="adress"
                  size="small"
                  label="Adress"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.adress}
                  onChange={formik.handleChange}
                  error={formik.touched.adress && Boolean(formik.errors.adress)}
                  helperText={formik.touched.adress && formik.errors.adress}
                />
                <TextField
                  className={classes.textfield}
                  variant="outlined"
                  fullWidth
                  id="zipcode"
                  name="zipcode"
                  size="small"
                  label="Zipcode"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.zipcode}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.zipcode && Boolean(formik.errors.zipcode)
                  }
                  helperText={formik.touched.zipcode && formik.errors.zipcode}
                />
                <TextField
                  className={classes.textfield}
                  variant="outlined"
                  fullWidth
                  id="complement"
                  name="complement"
                  size="small"
                  label="complement"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.complement}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.complement &&
                    Boolean(formik.errors.complement)
                  }
                  helperText={
                    formik.touched.complement && formik.errors.complement
                  }
                />
                <TextField
                  className={classes.textfield}
                  style={{ width: "45%" }}
                  variant="outlined"
                  fullWidth
                  id="countryCode"
                  name="countryCode"
                  size="small"
                  label="Country Code"
                  InputLabelProps={{ shrink: true }}
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
                <TextField
                  className={classes.textfield}
                  variant="outlined"
                  fullWidth
                  id="phone"
                  name="phone"
                  size="small"
                  label="Phone"
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />

                <Flex className={classes.uploadFields}>
                  <label>
                    <input type="file" accept="image/*" />
                    <FiUpload size={30} color="#91CDF2" />
                    <Typography textAlign="left">ID Frente</Typography>
                    <FiCheck size={30} color="#69BF41" />
                  </label>
                  <label>
                    <input type="file" accept="image/*" />
                    <FiUpload size={30} color="#91CDF2" />
                    <Typography>ID Verso</Typography>
                    <FiCheck size={30} color="#69BF41" />
                  </label>
                  <label>
                    <input type="file" accept="image/*" />
                    <FiUpload size={30} color="#91CDF2" />
                    <Typography>Comprovante residencia</Typography>
                    <FiCheck size={30} color="#69BF41" />
                  </label>
                  <label>
                    <input type="file" accept="image/*" />
                    <FiUpload size={30} color="#91CDF2" />
                    <Typography>Selfie</Typography>
                    <FiCheck size={30} color="#69BF41" />
                  </label>
                </Flex>
              </div>

              <Divider orientation="vertical" height="100%" />
              <Flex className={classes.flexImg}>
                <img
                  src={selectLogoTest}
                  alt=""
                  className={`${classes.documentImage} ${classes.documentImageContainer} `}
                  style={{
                    transform: `rotate(${rotation}deg)`,
                  }}
                />

                <Flex
                  flexDirection="column"
                  alignItems="center"
                  style={{ marginTop: "15px" }}
                >
                  <Flex center={true}>
                    <FiChevronsLeft
                      className={classes.iconRotateDocumentImage}
                      size={30}
                    />
                    <FiRotateCcw
                      onClick={documentImageRotateLeft}
                      className={classes.iconRotateDocumentImage}
                      size={25}
                    />
                    <FiRotateCw
                      onClick={documentImageRotateRight}
                      className={classes.iconRotateDocumentImage}
                      size={25}
                    />
                    <FiChevronsRight
                      className={classes.iconRotateDocumentImage}
                      size={30}
                    />
                  </Flex>
                  <Flex
                    center={true}
                    style={{ marginTop: "15px" }}
                    justifyContent="space-between"
                    width="35%"
                  >
                    <Button
                      style={{ background: "#E02020" }}
                      className={classes.btChangeStatusDocument}
                    >
                      Reprovar
                    </Button>
                    <Button
                      style={{ background: "#2CDA00" }}
                      className={classes.btChangeStatusDocument}
                    >
                      Aprovar
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

const initialValues = {
  firstName: "",
  lastName: "",
  ssn: "",
  birthday: "",
  country: "",
  state: "",
  city: "",
  adress: "",
  zipcode: "",
  complement: "",
  countryCode: "",
  phone: "",
  idFrente: "",
  idVerso: "",
  residency: "",
  selfie: "",
};

const validate = (values) => {
  const errors = {};

  return errors;
};

export default withStyles((theme) => ({
  titleDocumentDetail: {
    fontWeight: 700,
    fontSize: "2rem",
    color: theme.colors.text,
    margin: "0 0 50px 0",
  },
  inputGroupContainer: {
    margin: "0 0 15px 0",
  },
  inputField: {
    height: "30px",
    width: "200px",
    border: "1px solid #B2D4E4",
    borderRadius: "5px",
    padding: "10px",
    margin: "3px 0 0 0",
  },
  uploadFields: {
    flexDirection: "column",
    // width: "80%",
    gridColumn: "span 2",
    "& input[type=file]": {
      position: "absolute",
      top: "-1000px",
    },
    "& label": {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "flex-end",
      cursor: "pointer",
      margin: "15px 0 0 0",
    },
  },
  documentImageContainer: {
    padding: "20px",
    height: "540px",
    background: "white",
    borderRadius: "15px",
  },
  documentImage: {
    objectFit: "contain",
    // height: "100%",
    width: "100%",
  },
  btChangeStatusDocument: {
    borderRadius: "20px",
    height: "30px",
    width: "120px",
    fontSize: "1rem",
    textTransform: "unset",
  },
  iconRotateDocumentImage: {
    color: theme.colors.primary,
    margin: "0 10px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    alignContent: "center",
  },

  mainGrid: {
    height: "100%",
    grid: "20%  65%/ 30% 1% 65%",
    display: "grid",
    // alignContent: "center",
    // justifyItems: "center",
    // alignItems: "center",
    gap: 40,
    padding: "40px",
  },
  textfield: {
    color: "#727272",
    background: "white",
  },
  title: {
    textAlign: "start",
    gridColumn: "span 2",
    fontSize: 32,
    marginBottom: 40,
  },
  form: {
    height: "100%",
  },
  flexImg: {
    width: "80%",
    flexDirection: "column",
    alignItems: "center",
    justifySelf: "flex-start",
    marginLeft: 40,
  },
}))(UserData);
