/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

import {
  Flex,
  Typography,
  Button,
  Navigation,
  Table,
  Filter,
  Loading
} from "../../../../_common/components";
import { useSnackbar } from "../../../../_common/hooks";
import api from "../../../../services/api";
import copyLogo from "../../../../assets/images/copy-logo.png";
import { tableHeadClients, navList, filterList } from "../tableData";
import { NAVIGATION } from "../Managers/Managers";

const ManagerDashboard = (({ classes }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [linkToClients, setLinkToClients] = useState("");
  const [filter, setFilter] = useState();
  const [openSnackbar] = useSnackbar();

  const userRole = "clients"
  console.log("filter", filter)

  const getClientsFromManager = async () => {
    try {
      setLoading(true);
      const clientsData = [];
      const { data } = await api.get("manager/list-indications");
      const result = filterIndicationsByRole(data.payload);
      result.forEach((value) => {
        clientsData.push({
          name: `${value.first_name} ${value.last_name}`,
          created_at: value.created_at.substr(0, 10),
          phone_number: value.phone_number,
          value_applied: 10,
          profit: 100,
          comission: 15,
        });
      });
      setClients(clientsData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  const getLinkToClients = async () => {
    try {
      const result = await api.get("manager/link-to-someone-become-client");
      console.log('result', result)
      setLinkToClients(result.data.payload.link);
    } catch (error) {
      console.log(error);
    }
  };

  const filterIndicationsByRole = (userData) => {
    let users;
    if (userRole === "clients") {
      users = userData?.filter((role) => {
        return role.role_name === "Client";
      });
    }
    return users;
  }
  const filterCallback = useCallback((value) => setFilter(value), []);

  const copyToken = () => {
    navigator.clipboard.writeText(linkToClients);
    openSnackbar("Link copiado com sucesso", "success")
  };

  useEffect(() => {
    getClientsFromManager();
    getLinkToClients();
  }, []);

  return (
    <>
      <Flex className={classes.container}>
        <Flex className={classes.buttonsContainer}>
          <Navigation initialValue={NAVIGATION.CLIENTS} navList={navList} />
        </Flex>
        {loading ? (
          <Flex className={classes.loadingContainer}>
            < Loading isLoading size={60} className={classes.loading} />
          </Flex>
        ) : (
          <>
            <Flex className={classes.linkGenerationAndInputs}>
              <Flex flexDirection="column">
                <Typography className={classes.buttonInviteLabel} element="p">
                  Convite Cliente
                </Typography>
                <Button onClick={copyToken} className={classes.invitationClients}>
                  <Flex style={{ justifyContent: "center", width: "100%" }}>
                    <img alt="" src={copyLogo} className={classes.copyLogo} />
                    <Typography element="p" className={classes.buttonInviteText}>
                      {linkToClients}
                    </Typography>
                  </Flex>
                </Button>
              </Flex>
              <Flex className={classes.inputsContainer}>
                <Filter filterList={filterList} callback={filterCallback} noFlex />
              </Flex>
            </Flex>
            <Table tableHead={tableHeadClients} items={clients} loading={loading} />
          </>
        )}
      </Flex>
    </>
  );
})


export default withStyles((theme) => ({
  container: {
    flexDirection: "column",
    width: "100%",
  },
  buttonsContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginRight: "40px",
    "&:hover": {
      borderBottom: "1px solid green",
    },
  },
  linkGenerationAndInputs: {
    width: "100%",
    justifyContent: "space-between",
    marginTop: "105px",
  },
  buttonInviteLabel: {
    fontSize: "18px",
    color: "#151A30",
    textAlign: "left",
  },
  inputsContainer: {
    maxWidth: "400px",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "50px",
  },
  invitationClients: {
    background: "#151A30",
    color: "#5FB6AB",
    width: "465px",
    borderRadius: "16px",
    border: "1px solid #FFFFFF",
    height: "65px",
    fontWeight: "400",
    fontSize: "25px",
    cursor: "pointer",
  },
  buttonInviteText: {
    marginLeft: "19px",
    height: "31px",
    display: "inline-block",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  copyLogo: {
    height: "31px",
    width: "31px",
    marginLeft: "10px",
  },
  loadingContainer: {
    height: "60vh",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
}))(ManagerDashboard);

ManagerDashboard.propTypes = {
  classes: PropTypes.object,
};
