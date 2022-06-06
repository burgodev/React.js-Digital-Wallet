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
  Loading,
  Filter,
} from "../../../../_common/components";
import { useSnackbar } from "../../../../_common/hooks"
import api from "../../../../services/api";
import copyLogo from "../../../../assets/images/copy-logo.png";
import { tableHeadManagers, navList, filterList } from "../tableData";

const ManagerDashboard = ({ classes }) => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [linkToManagers, setLinkToManagers] = useState("");
  const [openSnackbar] = useSnackbar();

  const userRole = "managers";
  const [filter, setFilter] = useState();

  console.log(filter)
  const filterCallback = useCallback((value) => setFilter(value), []);

  const getManagersFromManager = async () => {
    try {
      setLoading(true);
      const managersData = [];
      const { data } = await api.get("manager/list-indications");
      const result = filterIndicationsByRole(data.payload);
      result?.forEach((value) => {
        managersData.push({
          name: `${value.first_name} ${value.last_name}`,
          createdAt: value.created_at.substr(0, 10),
          phoneNumber: value.phone_number,
          clientQuantity:
            value.quantity_total_indications - value.quantity_managers,
          managerQuantity: value.quantity_managers,
          level: "prata",
        });
      });
      setManagers(managersData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  const getLinkToManagers = async () => {
    try {
      const { data } = await api.get("manager/link-to-someone-become-manager");
      setLinkToManagers(data.payload.link);
    } catch (error) { }
  };

  const filterIndicationsByRole = (userData) => {
    let users;
    if (userRole === "managers") {
      users = userData?.filter((role) => {
        return role.role_name === "Manager";
      });
      return users;
    }
  }

  useEffect(() => {
    getManagersFromManager();
    getLinkToManagers();
  }, []);

  const copyToken = () => {
    navigator.clipboard.writeText(linkToManagers);
    openSnackbar("Link copiado com sucesso", "success")
  };

  return (
    <>
      <Flex className={classes.container}>
        <Flex className={classes.buttonsContainer}>
          <Navigation initialValue={NAVIGATION.MANAGERS} navList={navList} />
        </Flex>
        {loading ? (
          <Flex className={classes.loadingContainer}>
            <Loading isLoading size={60} className={classes.loading} />

          </Flex>
        ) : (
          <>
            <Flex className={classes.linkGenerationAndInputs}>
              <Flex flexDirection="column">
                <Typography className={classes.buttonInviteLabel} element="p">
                  Convite gestor
                </Typography>

                <Button
                  onClick={copyToken}
                  className={classes.invitationClients}
                >
                  <Flex style={{ justifyContent: "center", width: "100%" }}>
                    <img alt="" src={copyLogo} className={classes.copyLogo} />
                    <Typography
                      element="p"
                      className={classes.buttonInviteText}
                    >
                      {linkToManagers}
                    </Typography>
                  </Flex>
                </Button>
              </Flex>
              <Flex className={classes.inputsContainer}>
                <Filter
                  filterList={filterList}
                  callback={filterCallback}
                  noFlex
                />
              </Flex>
            </Flex>
            <Table tableHead={tableHeadManagers} items={managers} loading={loading} />
          </>
        )}
      </Flex>
    </>
  );
};
export const NAVIGATION = {
  CLIENTS: "CLIENTS",
  MANAGERS: "MANAGERS",
};

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
  inputSearch: {
    marginBottom: "15px",
    marginLeft: "21px",
    backgroundColor: "#EEEEEE",
    padding: "0 15px",
    width: "312px",
    borderRadius: "16px",
    height: "53px",
    border: `1px solid ${theme.colors.lightGray}`,
  },
  inputSearch1: {
    marginBottom: "15px",
    marginLeft: "21px",
    backgroundColor: "#EEEEEE",
    padding: "0 40px",
    width: "312px",
    borderRadius: "16px",
    height: "53px",
    border: `1px solid ${theme.colors.lightGray}`,
  },

  iconInputFilter: {
    position: "absolute",
    left: "40px",
    top: "17px",
    width: "17px",
    height: "17px",
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
