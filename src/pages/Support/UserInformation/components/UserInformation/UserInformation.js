import React, { useEffect, useState } from "react";
import { withStyles, InputLabel, TextField } from "@material-ui/core";
import PropTypes from "prop-types";

import { Typography, Flex } from "../../../../../_common/components";

import api from "../../../../../services/api";
import { theme } from "../../../../../_common/utils/theme";
// import csc from "country-state-city";
import { FiLoader } from "react-icons/fi";
import { Check, FindInPage, Report } from "@material-ui/icons";


const MainUserInformation = ({ classes }) => {
  const email = localStorage.getItem("admin_user_email");
  const user_reference = localStorage.getItem("admin_user_reference")

  const [userData, setUserData] = useState([]);
  const [birthDate, setBirthDate] = useState(new Date());
  const [countryCode, setCountryCode] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [documentStatus, setDocumentStatus] = useState([]);
  const [address,setAddress] = useState()

  console.log(state)
  console.log(email)


  const countryByCode = async (countryCode) => {
    // const result = await csc.getCountryByCode(countryCode);
    // setCountry(result.name);
    setCountry("Brasil");
  };


  console.log(userData)
  
  const stateByCode = async (stateCode, countryCode) => {
    // const result = await csc.getStateByCodeAndCountry(stateCode, countryCode);
    setState("Santa Catarina");
  };
  const getDocumentStatus = async (user_reference) => {
    const data = {
      user_id:user_reference
    }
    try {
      const response = await api.post("admin/user/documents",data) 
      setDocumentStatus(response.data.payload[0].document);
    } catch (error) {}
  };

  useEffect(() => {
    const getUserInformation = async () => {
      try {
        const result = await api.post("admin/user/all-user-information",{user_id:user_reference});
        setUserData(result.data.payload[0]);
        setAddress(result.data.payload[0].addresses[0])
        setCountryCode(result.data.payload[0].addresses[0].country_id);
        setStateCode(result.data.payload[0].addresses[0].state);
        const convertDate = result.data.payload[0].birth_date.split("T")[0];
        setBirthDate(convertDate);
      } catch (error) {}
    };

    getUserInformation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 

  useEffect(() => {
    countryByCode(countryCode);
    stateByCode(stateCode, countryCode);
    getDocumentStatus(user_reference);
  }, [stateCode, countryCode, user_reference]);

  return (
    <Flex flexDirection="column">
      <Flex className={classes.formContainer}>
        <Flex flexDirection="column">
          <Typography className={classes.titleData}>DADOS PESSOAIS</Typography>
          <Flex className={classes.fieldsContainerLocation}>
            <Flex flexDirection="column">
              <InputLabel htmlFor="firstName" className={classes.inputLabel}>
                Nome
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
                Sobrenome
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
                Número do documento
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
                Data de nascimento
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
                País
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
                Estado
              </InputLabel>
              <TextField
                id="state"
                name="state"
                value={address?.state}
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                className={classes.inputField}
              />
            </Flex>
            <Flex flexDirection="column" className={classes.padding15}>
              <InputLabel htmlFor="city" className={classes.inputLabel}>
                Cidade
              </InputLabel>
              <TextField
                id="city"
                name="city"
                value={address?.city}
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
                Cep
              </InputLabel>
              <TextField
                id="zipcode"
                name="zipcode"
                value={address?.cep}
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                className={classes.inputField}
              />
            </Flex>
            <Flex flexDirection="column" className={classes.padding15}>
              <InputLabel htmlFor="address" className={classes.inputLabel}>
                Endereço
              </InputLabel>
              <TextField
                id="address"
                name="address"
                value={`${address?.street}, ${address?.number}`}
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
                Complemento
              </InputLabel>
              <TextField
                id="complement"
                name="complement"
                value={`${address?.complement}`}
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
                Código do país
              </InputLabel>
              <TextField
                id="countryCode"
                name="countryCode"
                value={`+ ${userData.nationality_id}`}
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
                Telefone
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
        </Flex>
      </Flex>
      <Typography className={classes.titleDocuments}>DOCUMENTOS</Typography>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        className={classes.boxDocumentStatusContainer}
      >
        {documentStatus.map((document) => (
          <Flex width="48%" className={classes.boxDocumentStatus}>
            <Flex flexDirection="column">
              <Typography className={classes.labelDocumentStatus}>
                {document.document_type.name}
              </Typography>

              {document.document_status === 'WAITING_UPLOAD' ? (
                <Typography className={classes.labelStatus} color="orange">
                  AGUARDANDO ENVIO
                </Typography>
              ) : document.document_status  === 'WAITING_VALIDATION' ? (
                <Typography className={classes.labelStatus} color="#ea3b3b">
                  AGUARDANDO VALIDAÇÃO
                </Typography>
              ) : document.document_status === 'APPROVED' ? (
                <Typography className={classes.labelStatus} color="#03d047">
                  APROVADO
                </Typography>
              ) : document.document_status === 'DENIED' ? (
                <Typography className={classes.labelStatus} color="#ea3b3b">
                  RECUSADO
                </Typography>
              ) : (
                ""
              )}
            </Flex>
            <Flex width="20%" alignItems="center" justifyContent="flex-end">
              {document.document_status === 'WAITING_UPLOAD' ? (
                <FiLoader size={24} color={theme.colors.primary} />
              ) : document.document_status === 'WAITING_VALIDATION' ? (
                <FindInPage
                  fontSize="medium"
                  style={{ color: theme.colors.primary }}
                />
              ) : document.document_status === 'APPROVED' ? (
                <Check fontSize="medium" style={{ color: "#03d047" }} />
              ) : document.document_status === 'DENIED' ? (
                <Report fontSize="medium" style={{ color: "#ea3b3b" }} />
              ) : (
                ""
              )}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
export default withStyles((theme) => ({
  formContainer: {
    flexDirection: "column",
    [theme.breakpoints.only("lg")]: {
      width: "95% !important",
    },
    [theme.breakpoints.down("md")]: {},
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
    fontWeight: 700,
    color: theme.colors.text,
    opacity: "0.5",
    [theme.breakpoints.only("lg")]: {
      fontSize: "1.2rem",
    },
    [theme.breakpoints.down("md")]: {},
  },
  titleDocuments: {
    textAlign: "left",
    fontSize: "1.5rem",
    fontWeight: 700,
    color: theme.colors.text,
    opacity: "0.5",
    margin: "50px 0 15px 0",
    [theme.breakpoints.only("lg")]: {
      fontSize: "1.2rem",
    },
  },
  inputLabel: {
    fontFamily: "Poppins, sans-serif",
    fontSize: "1rem",
    fontWeight: 600,
    color: theme.colors.primary,
    marginBottom: "5px",
    [theme.breakpoints.only("lg")]: {
      fontSize: "0.7rem",
    },
  },
  contactInfoContainer: {
    marginTop: "15px",
  },

  inputLabelContactNumber: {
    width: "25% !important",
    [theme.breakpoints.down("xs")]: {
      width: "50% !important",
    },
    [theme.breakpoints.only("lg")]: {
      width: "60% !important",
    },
  },
  boxDocumentStatusContainer: {
    background: "white",
    flexWrap: "wrap",
    [theme.breakpoints.only("lg")]: {
      width: "95% !important",
    },
    [theme.breakpoints.down("md")]: {},
  },
  boxDocumentStatus: {
    border: `1px solid ${theme.colors.lightGray}`,
    borderRadius: "5px",
    padding: "10px",
    margin: "3px",
    [theme.breakpoints.only("lg")]: {},
    [theme.breakpoints.down("md")]: {},
  },
  labelDocumentStatus: {
    color: theme.colors.primary,
    fontWeight: 600,
    fontSize: "0.9rem",
    textAlign: "left",
    marginBottom: "5px",
    [theme.breakpoints.only("lg")]: {
      fontSize: "0.8rem",
    },
  },
  labelStatus: {
    textAlign: "left",
    fontWeight: 700,
    fontSize: "0.8rem",
    [theme.breakpoints.only("lg")]: {
      fontSize: "0.55rem",
    },
    [theme.breakpoints.only("xs")]: {
      fontSize: "0.7rem",
    },
  },
}))(MainUserInformation);

MainUserInformation.propTypes = {
  classes: PropTypes.object,
};
