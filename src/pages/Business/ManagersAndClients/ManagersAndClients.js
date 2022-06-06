import React, { useState, useEffect, useCallback } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
// import { useHistory } from "react-router";

import {
  Flex,
  Navigation,
  Table,
  Loading,
  //Filter,
  Snackbar,
} from "../../../_common/components";
import api from "../../../services/api";
import ModalActions from "./components/ModalActions";

const ACTIONS = {
  EVALUATE: 0,
  CHANGE_LEVEL: 1,
  CHANGE_MANAGER: 2,
};

const ManagersAndClients = ({ classes }) => {
  // const history = useHistory();
  const [managers, setManagers] = useState([]);
  const [item, setItem] = useState();
  // const [userEmail, setUserEmail] = useState("");
  // const [userReference, setUserReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(false);
  const [openActions, setOpenActions] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [orderBy, setOrderBy] = useState("DESC");
  // const [filter, setFilter] = useState();
  const [snackbar /*, setSnackbar*/] = useState({
    message: "",
    severity: "",
    open: false,
  });

  const getUsersForValidation = useCallback(async () => {
    let managersData = [];
    try {
      setLoading(true);
      const { data } = await api.get(
        `commercial/all-clients-and-managers?page=${page}&order_by=${orderBy}`
      );
      data.payload.list.map((manager) => {
        return managersData.push({
          id: manager.id,
          createdAt: manager.created_at.substr(0, 10),
          solicitedAt: "10/01/2022",
          name: `${manager.first_name} ${manager.last_name}`,
          roles: manager.roles,
        });
      });
      setManagers(managersData);
      setTotalPages(data.payload.pages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [page, orderBy]);

  // PRECISA DESSE USEEFFECT? TA NO LUGAR CERTO ESSA VALIDAÇÃO?
  // useEffect(() => {
  //   if (userEmail !== "") {
  //     localStorage.setItem("admin_user_email", userEmail);
  //     localStorage.setItem("admin_user_reference", userReference);
  //     history.push("/admin/user/information");
  //   } else {
  //     console.log("Erro");
  //   }
  // }, [userEmail, userReference, history]);

  const actionList = [
    {
      id: 0,
      type: "list",
      list: [
        {
          text: "Avaliar",
          onClick: (row) => {
            setOpenActions(true);
            setAction(ACTIONS.EVALUATE);
            setItem(row);
          },
        },
        {
          text: "Detalhes",
          onClick: (row) => {
            setItem(row);
            alert("Funcionalidade ainda não implementada");
          },
        },
        {
          text: "Alterar nível",
          onClick: (row) => {
            setOpenActions(true);
            setAction(ACTIONS.CHANGE_LEVEL);
            setItem(row);
          },
        },
        {
          text: "Alterar gestor",
          onClick: (row) => {
            setOpenActions(true);
            setAction(ACTIONS.CHANGE_MANAGER);
            setItem(row);
          },
        },
      ],
    },
  ];
  useEffect(() => {
    getUsersForValidation();
  }, [getUsersForValidation]);

  return (
    <>
      <Flex className={classes.container}>
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
              tableHead={tableHead}
              items={managers}
              actions={actionList}
              pagination={true}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
              setOrderBy={setOrderBy}
            />
          </>
        )}
      </Flex>
      <ModalActions
        open={openActions}
        action={action}
        onClose={() => setOpenActions(false)}
        item={item}
      />
      <Snackbar data={snackbar} />
    </>
  );
};

const tableHead = [
  {
    text: "Data de Cadastro",
    id: 1,
  },
  {
    text: "Data de Solicitação",
    id: 2,
  },
  {
    text: "Nome",
    id: 3,
  },
  {
    text: "Perfil de Usuário",
    id: 4,
  },
  {
    text: "Ação",
    id: 5,
  },
];

// const MOCKUP = [
//   {
//     id: 0,
//     registerDate: "10/10/2021",
//     solicitationDate: "15/08/2021",
//     name: "teste",
//     role: "Admin",
//   },
//   {
//     id: 1,
//     registerDate: "10/10/2021",
//     solicitationDate: "15/08/2021",
//     name: "teste",
//     role: "Admin",
//   },
//   {
//     id: 2,
//     registerDate: "10/10/2021",
//     solicitationDate: "15/08/2021",
//     name: "teste",
//     role: "Admin",
//   }
// ]

const navList = [
  {
    id: 0,
    text: "Clientes e Gestores",
    link: "/business/managers-and-clients",
  },
];

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
    marginTop: "40px",
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
}))(ManagersAndClients);

ManagersAndClients.propTypes = {
  classes: PropTypes.object,
};
