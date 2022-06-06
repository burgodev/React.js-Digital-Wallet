import React, { useState, useEffect, useCallback } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { useHistory } from "react-router";

import {
  Flex,
  Navigation,
  Table,
  Loading,
  //Filter,
} from "../../../_common/components";
import api from "../../../services/api";

const NewManagers = ({ classes }) => {
  const history = useHistory();
  const [managers, setManagers] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [userReference, setUserReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [orderBy, setOrderBy] = useState("DESC");

  const tableHead = [
    {
      text: "Data Solicitação",
      ordernation: true,
      id: 1,
    },
    {
      text: "Email",
      id: 2,
    },
    {
      text: "Numéro do documento",
      id: 3,
    },
    {
      text: "Nome",
      id: 4,
    },
    {
      text: "Status",
      id: 5,
    },

    {
      text: "Ação",
      id: 6,
    },
  ];

  const navList = [
    {
      id: 0,
      text: "Solicitação de Gestores de Contas",
      link: "/admin/users/validation_managers",
    },
  ];

  // const filterList = [
  //   {
  //     name: "Name",
  //     type: "text",
  //     label: "Nome",
  //   },
  //   {
  //     name: "Date",
  //     type: "text",
  //     label: "Data início",
  //   },
  // ];

  const actionList = [
    {
      text: "Detalhes",
      type: "button",
      width: "100%",
      onClick: (row) => {
        setUserReference(row.id);
        setUserEmail(row.email);
      },
    },
    {
      text: "Aprovar",
      type: "button",
      width: "100%",
      secondary: true,
      onClick: (row) => {
        handleApproveManager(row.id);
      },
    },
  ];

  const getUsersForValidation = useCallback(async () => {
    let managersData = [];
    try {
      setLoading(true);
      const { data } = await api.get(
        `commercial/all-status-waiting-managers-to-be-approved?page=${page}&order_by=${orderBy}`
      );
      data.payload.list.map((manager) => {
        return managersData.push({
          id: manager.id,
          createdAt: manager.created_at.substr(0, 10),
          email: manager.email,
          documentNumber: manager.document_number,
          name: `${manager.first_name} ${manager.last_name}`,
          status: `${
            manager.status ? "Aguardando aprovação" : "Aguardando aprovação"
          }`,
        });
      });
      setManagers(managersData);
      setTotalPages(data.payload.pages > 0 ? data.payload.pages : 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [page, orderBy]);

  const handleApproveManager = async (user_id) => {
    try {
      const data = {
        user_id: user_id,
      };
      await api.post("/commercial/active-manager", data);
      getUsersForValidation();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (userEmail !== "") {
      localStorage.setItem("admin_user_email", userEmail);
      localStorage.setItem("admin_user_reference", userReference);
      history.push("/admin/user/information");
    } else {
      console.log("Erro");
    }
  }, [userEmail, userReference, history]);

  useEffect(() => {
    getUsersForValidation();
  }, [getUsersForValidation]);

  return (
    <>
      <Flex className={classes.container} initialValue={0}>
        <Flex className={classes.navigationContainer}>
          <Navigation navList={navList} />
        </Flex>
        {loading ? (
          <Flex className={classes.loadingContainer}>
            <Loading isLoading size={60} className={classes.loading} />
          </Flex>
        ) : (
          <>
            <Flex className={classes.Inputs}>
              <Flex className={classes.inputsContainer}>
                {/* <Filter
                  filterList={filterList}
                  callback={filterCallback}
                  noFlex
                /> */}
              </Flex>
            </Flex>

            <Table
              setPage={setPage}
              page={page}
              totalPages={totalPages}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              tableHead={tableHead}
              items={managers}
              pagination={true}
              actions={actionList}
            />
          </>
        )}
      </Flex>
    </>
  );
};

export default withStyles((theme) => ({
  container: {
    flexDirection: "column",
    width: "100%",
  },
  navigationContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  Inputs: {
    width: "100%",
    justifyContent: "space-between",
    marginTop: "105px",
  },
  inputsContainer: {
    maxWidth: "100%",
    justifyContent: "right",
    alignItems: "right",
    marginBottom: "50px",
  },
  inputSearchContainer: {
    position: "relative",
    alignItems: "center",
    right: "0",
  },
  iconInputFilter: {
    position: "absolute",
    left: "40px",
    top: "17px",
    width: "17px",
    height: "17px",
  },
  loadingContainer: {
    height: "60vh",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
}))(NewManagers);

NewManagers.propTypes = {
  classes: PropTypes.object,
};
