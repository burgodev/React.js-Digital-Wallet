import React, { useEffect, useState } from "react";

import { withStyles, InputLabel, TextField, Divider } from "@material-ui/core";
import PropTypes from "prop-types";

import { Typography, Flex } from "../../../../../_common/components";
import logoSelect from "../../../../../assets/images/select-logo.png";

import api from "../../../../../services/api";
import { theme } from "../../../../../_common/utils/theme";
// import csc from "country-state-city";
import { FiLoader } from "react-icons/fi";
import ProfileValidation from "../../ProfileValidation";
import { Check, FindInPage, Report } from "@material-ui/icons";
import ModalAccountApproved from "../ModalAccountApproved/ModalAccountApproved";

const OverviewInformation = ({ classes }) => {
  const [userData, setUserData] = useState([]);
  const [birthDate, setBirthDate] = useState(new Date());
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const email = localStorage.getItem("email");
  const [documentStatus, setDocumentStatus] = useState([]);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);

  const userReference = localStorage.getItem("user_reference");

  useEffect(() => {
    const getUserInformation = async () => {
      try {
        const result = await api.get("user/data");
        setUserData(result.data);
        setCountryCode(result.data.country);
        setStateCode(result.data.state);

        const convertDate = result.data.birth_date.split("T")[0];
        setBirthDate(convertDate);
      } catch (error) {}
    };

    getUserInformation();
  }, [email]);

  useEffect(() => {
    countryByCode(countryCode);
    stateByCode(stateCode, countryCode);
    getDocumentStatus(userReference);
  }, [countryCode, stateCode, userReference]);

  const countryByCode = async (countryCode) => {
    // const result = await csc.getCountryByCode(countryCode);
    setCountry("Brasil");
  };

  const stateByCode = async (stateCode, countryCode) => {
    // const result = await csc.getStateByCodeAndCountry(stateCode, countryCode);
    setState("SC");
  };
  const getDocumentStatus = async (userReference) => {
    try {
      const { data } = await api.get("user/documents/status", {
        headers: {
          authorization: userReference,
        },
      });
      setDocumentStatus(data);
      if (
        data[0].status_id === 3 &&
        data[1].status_id === 3 &&
        data[2].status_id === 3 &&
        data[3].status_id === 3
      ) {
        setOpenModalSuccess(true);
      }
    } catch (error) {}
  };

  return (
    <Flex
      flexDirection="column"
      center
      className={classes.profileValidationContainer}
    >
      <ModalAccountApproved openModal={openModalSuccess} />
      <Flex width="100%" justifyContent="center">
        <img src={logoSelect} alt="Logo" className={classes.logoSelect} />
      </Flex>
      <Flex className={classes.formContainer}>
        <ProfileValidation activeStep1={2} />
        <Flex flexDirection="column" style={{ padding: "0 50px" }}>
          <Typography className={classes.titleData}>Profile data</Typography>
          <Divider className={classes.dividerProfileData} />
          <Flex className={classes.fieldsContainerLocation}>
            <Flex flexDirection="column">
              <InputLabel htmlFor="firstName" className={classes.inputLabel}>
                First name
              </InputLabel>
              <TextField
                id="firstName"
                name="firstName"
                value={userData.first_name}
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                className={classes.inputField}
              />
            </Flex>
            <Flex flexDirection="column" className={classes.padding15}>
              <InputLabel htmlFor="lastName" className={classes.inputLabel}>
                Last name
              </InputLabel>
              <TextField
                id="lastName"
                name="lastName"
                value={userData.last_name}
                size="small"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Flex>
          </Flex>
          <Flex className={classes.fieldsContainerLocation}>
            <Flex flexDirection="column">
              <InputLabel htmlFor="firstName" className={classes.inputLabel}>
                Document number
              </InputLabel>
              <TextField
                id="documentNumber"
                name="documentNumber"
                value={userData.document_number}
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                className={classes.inputField}
              />
            </Flex>
            <Flex flexDirection="column" className={classes.padding15}>
              <InputLabel htmlFor="lastName" className={classes.inputLabel}>
                Birth date
              </InputLabel>
              <TextField
                type="date"
                id="lastName"
                name="lastName"
                value={birthDate}
                size="small"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Flex>
          </Flex>
          <Flex className={classes.fieldsContainerLocation}>
            <Flex flexDirection="column">
              <InputLabel htmlFor="country" className={classes.inputLabel}>
                Country
              </InputLabel>
              <TextField
                id="country"
                name="country"
                value={country}
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                className={classes.inputField}
              />
            </Flex>
            <Flex flexDirection="column" className={classes.padding15}>
              <InputLabel htmlFor="state" className={classes.inputLabel}>
                State
              </InputLabel>
              <TextField
                id="state"
                name="state"
                value={state}
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                className={classes.inputField}
              />
            </Flex>
            <Flex flexDirection="column" className={classes.padding15}>
              <InputLabel htmlFor="city" className={classes.inputLabel}>
                City
              </InputLabel>
              <TextField
                id="city"
                name="city"
                value={userData.city}
                size="small"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Flex>
          </Flex>
          <Flex className={classes.fieldsContainerLocation}>
            <Flex flexDirection="column">
              <InputLabel htmlFor="zipcode" className={classes.inputLabel}>
                Zipcode
              </InputLabel>
              <TextField
                id="zipcode"
                name="zipcode"
                value={userData.zipcode}
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                className={classes.inputField}
              />
            </Flex>
            <Flex flexDirection="column" className={classes.padding15}>
              <InputLabel htmlFor="address" className={classes.inputLabel}>
                Address
              </InputLabel>
              <TextField
                id="address"
                name="address"
                value={userData.address}
                size="small"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Flex>
          </Flex>
          <Flex className={classes.fieldsContainer}>
            <Flex flexDirection="column">
              <InputLabel htmlFor="complement" className={classes.inputLabel}>
                Complement
              </InputLabel>
              <TextField
                id="complement"
                name="complement"
                value={userData.complement}
                size="small"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Flex>
          </Flex>
          <Flex
            justifyContent="flex-start"
            className={classes.contactInfoContainer}
          >
            <Flex
              flexDirection="column"
              className={classes.inputLabelContactNumber}
            >
              <InputLabel htmlFor="countryCode" className={classes.inputLabel}>
                Country code
              </InputLabel>
              <TextField
                id="countryCode"
                name="countryCode"
                value={`+ ${userData.country_code}`}
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                className={classes.inputFieldCountryCode}
              />
            </Flex>
            <Flex
              flexDirection="column"
              className={`${classes.padding15} ${classes.inputLabelContactNumber}`}
            >
              <InputLabel htmlFor="phoneNumber" className={classes.inputLabel}>
                Phone number
              </InputLabel>
              <TextField
                id="phoneNumber"
                name="phoneNumber"
                value={userData.phone_number}
                size="small"
                InputProps={{
                  readOnly: true,
                }}
              />
            </Flex>
          </Flex>
          <Typography
            className={classes.titleData}
            style={{ marginTop: "50px" }}
          >
            Document status
          </Typography>
          <Typography
            textAlign="left"
            fontWeight={500}
            fontSize="0.9rem"
            style={{ marginTop: "10px", fontStyle: "italic" }}
          >
            O prazo para validação dos documentos é de 72h.
          </Typography>
          <Divider className={classes.dividerDocumentStatus} />
          <Flex flexDirection="column" alignItems="center">
            {documentStatus.map((document) => (
              <Flex className={classes.boxDocumentStatus}>
                <Flex flexDirection="column">
                  <Typography className={classes.labelDocumentStatus}>
                    {document.document_type}
                  </Typography>

                  {document.status_id === 1 ? (
                    <Typography
                      className={classes.labelStatus}
                      color={theme.colors.text}
                    >
                      Waiting upload
                    </Typography>
                  ) : document.status_id === 2 ? (
                    <Typography className={classes.labelStatus} color="orange">
                      Waiting validation
                    </Typography>
                  ) : document.status_id === 3 ? (
                    <Typography className={classes.labelStatus} color="#03d047">
                      Approved
                    </Typography>
                  ) : document.status_id === 4 ? (
                    <Typography className={classes.labelStatus} color="red">
                      Refused
                    </Typography>
                  ) : (
                    ""
                  )}
                </Flex>
                <Flex width="20%" alignItems="center" justifyContent="flex-end">
                  {document.status_id === 1 ? (
                    <FiLoader size={28} color={theme.colors.primary} />
                  ) : document.status_id === 2 ? (
                    <FindInPage
                      fontSize="large"
                      style={{ color: theme.colors.primary }}
                    />
                  ) : document.status_id === 3 ? (
                    <Check fontSize="large" style={{ color: "#03d047" }} />
                  ) : document.status_id === 4 ? (
                    <Report fontSize="large" style={{ color: "red" }} />
                  ) : (
                    ""
                  )}
                </Flex>
              </Flex>
            ))}
          </Flex>
          <Flex justifyContent="center">
            <Typography fontWeight={400} fontSize="0.9rem">
              Enviaremos um email notificando a aprovação dos dados enviados.
            </Typography>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default withStyles((theme) => ({
  profileValidationContainer: {
    padding: "25px 0",
    height: "100%",
    width: "100%",
    background:
      "linear-gradient(196deg, rgba(57, 140, 191, 0.7) 0%, rgba(105,191,167,0.1) 100%)",
    [theme.breakpoints.only("xs")]: {
      padding: "25px 10px",
    },
  },
  formContainer: {
    height: "85%",
    width: "100%",
    maxWidth: "700px",
    backgroundColor: "white",
    borderRadius: "15px",
    marginTop: "20px",
    flexDirection: "column",
    padding: "25px 0 35px 0",
    boxShadow: "-1px 1px 14px -3px rgba(0,0,0,0.20)",
  },
  logoSelect: {
    width: "250px",
  },
  dividerProfileData: {
    margin: "5px 0",
  },
  dividerDocumentStatus: {
    margin: "15px 0 40px 0",
  },
  fieldsContainer: {
    justifyContent: "space-between",
    margin: "30px 0 0 0",
  },
  fieldsContainerLocation: {
    justifyContent: "space-between",
    margin: "30px 0 0 0",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "unset",
      flexDirection: "column",
    },
  },
  padding15: {
    padding: "0 0 0 15px",
    [theme.breakpoints.down("xs")]: {
      padding: "0 0 0 0",
    },
  },
  inputField: {
    [theme.breakpoints.down("xs")]: {
      marginBottom: "15px",
    },
  },
  inputFieldCountryCode: {
    width: "100px",
  },
  titleData: {
    textAlign: "left",
    fontSize: "1.5rem",
    fontWeight: 600,
    color: theme.colors.text,
  },
  inputLabel: {
    fontFamily: "Poppins, sans-serif",
    fontSize: "1rem",
    fontWeight: 600,
    color: theme.colors.primary,
    marginBottom: "5px",
  },
  contactInfoContainer: {
    marginTop: "15px",
  },

  inputLabelContactNumber: {
    width: "25% !important",
    [theme.breakpoints.down("xs")]: {
      width: "50% !important",
    },
  },

  boxDocumentStatus: {
    border: `1px solid ${theme.colors.lightGray}`,
    borderRadius: "5px",
    padding: "15px 25px 15px 25px",
    marginBottom: "20px",
  },
  labelDocumentStatus: {
    color: theme.colors.primary,
    fontWeight: 600,
    fontSize: "1.2rem",
    textAlign: "left",
    marginBottom: "8px",
    [theme.breakpoints.only("xs")]: {
      fontSize: "0.9rem",
    },
  },
  labelStatus: {
    textAlign: "left",
    fontWeight: 600,
    fontSize: "0.9rem",
    [theme.breakpoints.only("xs")]: {
      fontSize: "0.7rem",
    },
  },
}))(OverviewInformation);

OverviewInformation.propTypes = {
  classes: PropTypes.object,
};
