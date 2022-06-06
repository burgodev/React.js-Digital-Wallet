import React,{ useEffect, useState,useCallback} from "react";
import { Divider, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { Flex, Typography } from "../../../_common/components";
import Documents from "./components/Documents/Documents";
import UserInformation from "./components/UserInformation/UserInformation";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../../services/api";

const MainUserInformation = ({ classes }) => {
  const [userData,setUserData] = useState()
  // const [documentsData,setDocumentsData] = useState()
  const user_reference = localStorage.getItem("admin_user_reference");

  console.log(userData)

  const getUserData = useCallback(async()=> { 
    try {
      const result = await api.get("admin/user/all-user-information",{data:{user_id:user_reference}});
      setUserData(result.data.payload);
    } catch (error) {
      console.log(error);
    }
  },[user_reference]);

  useEffect(()=> {
    getUserData()
  },[getUserData])

  return (
    <Flex width="100%" className={classes.userInformationContainer}>
      <Typography
        element="a"
        url="/support/users/validation"
        className={classes.btBack}
      >
        <FiArrowLeft size={25} strokeWidth={2.5} />
        Voltar
      </Typography>
      <Typography className={classes.titlePage}>
        VALIDAÇÃO DE USUÁRIO
      </Typography>

      <Divider width="100%" style={{ margin: "8px 0 50px 0" }} />

      <Flex justifyContent="space-between">
        <Flex className={classes.userInformationComponent}>
          <UserInformation />
        </Flex>
        <Flex className={classes.documentsComponent}>
          <Documents />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default withStyles((theme) => ({
  userInformationContainer: {
    flexDirection: "column",
    background: "white",
    height: "95vh",
    width: "100%",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "-1px 1px 14px -3px rgba(0,0,0,0.10)",
    [theme.breakpoints.only("lg")]: {},
  },
  userInformationComponent: {
    width: "45% !important",
  },
  documentsComponent: {
    width: "45% !important",
    [theme.breakpoints.only("lg")]: {
      width: "48% !important",
    },
  },
  btBack: {
    display: "flex",
    alignItems: "center",
    fontWeight: 600,
    color: theme.colors.primary,
    textAlign: "left",
    marginBottom: "35px",
    cursor: "pointer",
  },
  titlePage: {
    fontWeight: 700,
    fontSize: "1.8rem",
    textAlign: "left",
    color: theme.colors.text,
  },
}))(MainUserInformation);

MainUserInformation.propTypes = {
  classes: PropTypes.object,
};
