import React, { useState, useEffect, useCallback } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { useHistory } from "react-router";

import { Flex, Typography, Table, Loading } from "../../../_common/components";
import api from "../../../services/api";
import { FiSearch } from "react-icons/fi";

function ListUserValidation({ classes }) {
  const history = useHistory();
  const [userData, setUserData] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [userReference, setUserReference] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [orderBy, setOrderBy] = useState("DESC");
  const actionList = [
    {
      text: "Verificar",
      type: "button",
      width: "100%",
      onClick: (row) => {
        setUserReference(row.id);
        setUserEmail(row.email);
      },
    },
  ];

  const getUsersValidation = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `admin/user?page=${page}&order_by=${orderBy}`
      );
      const data = response.data.payload.list;

      setTotalPages(
        response.data.payload.pages > 0 ? response.data.payload.pages : 1
      );

      const result = data.map((value) => {
        return {
          id: value.id,
          created_at: `${value.created_at?.substr(
            0,
            10
          )} - ${value.created_at?.substr(11, 5)} `,
          document_number: value.document_number,
          username: `${value.first_name}`,
          email: `${value.email}`,
          status: `${
            value.waiting_validation === 0 &&
            value.denied === 0 &&
            value.approved === 0
              ? "Aguardando envio"
              : "Aguardando aprovação"
          }`,
        };
      });
      console.log("data", data);
      setUserData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [page, orderBy]);

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
    getUsersValidation();
  }, [getUsersValidation]);

  // const searchUserByName = (value) => {
  //   if (searchUser === "") {
  //     return value;
  //   }
  //   const results = value.first_name === searchUser || value.last_name === searchUser;

  //   return results
  // };

  return (
    <Flex flexDirection="column" style={{ height: "100vh" }}>
      <Flex className={classes.userListContainer}>
        <Flex flexDirection="column">
          <Typography textAlign="left" className={classes.titlePageDocuments}>
            Usuários para validação
          </Typography>
          <Typography className={classes.subtitlePageDocuments}>
            Apenas listando novos usuários que ainda não tiveram sua conta
            validada.
          </Typography>
          <Flex className={classes.inputSearchContainer}>
            <input
              type="text"
              placeholder="Pesquise pelo nome do usuário"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              className={classes.inputSearch}
            />
            <FiSearch
              size={20}
              color="gray"
              className={classes.iconInputFilter}
            />
          </Flex>
        </Flex>
        {loading ? (
          <Flex className={classes.loadingContainer}>
            <Loading isLoading size={60} className={classes.loading} />
          </Flex>
        ) : (
          <Table
            tableHead={tableHead}
            setPage={setPage}
            page={page}
            totalPages={totalPages}
            items={userData}
            pagination={true}
            actions={actionList}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
          />
        )}
      </Flex>
    </Flex>
  );
}

const tableHead = [
  {
    text: "Data de cadastro",
    ordenation: true,
    id: 1,
  },
  {
    text: "Número do documento",
    id: 2,
  },
  {
    text: "Nome do usuário",
    id: 3,
  },
  {
    text: "Email",
    id: 4,
  },
  {
    text: "Status da conta",
    id: 5,
  },
  {
    text: "Ação",
    id: 6,
  },
];

export default withStyles((theme) => ({
  userListContainer: {
    flexDirection: "column",
    background: "white",
    height: "100%",
    width: "100% !important",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "-1px 1px 14px -3px rgba(0,0,0,0.10)",
    [theme.breakpoints.only("lg")]: {
      width: "98% !important",
      padding: "40px 30px 30px 30px",
    },
  },
  titlePageDocuments: {
    fontWeight: 700,
    fontSize: "2rem",
    color: theme.colors.text,
    [theme.breakpoints.only("lg")]: {
      fontSize: "1.8rem",
    },
  },
  subtitlePageDocuments: {
    textAlign: "left",
    fontStyle: "italic",
    fontSize: "0.9rem",
    margin: "20px 0 30px 0",
    [theme.breakpoints.only("lg")]: {
      marginTop: "14px",
    },
  },
  inputSearchContainer: {
    position: "relative",
    width: "25% !important",
    alignItems: "center",
    [theme.breakpoints.only("lg")]: {
      width: "40% !important",
    },
  },
  inputSearch: {
    marginBottom: "15px",
    padding: "0 15px",
    width: "100%",
    borderRadius: "4px",
    height: "40px",
    border: `1px solid ${theme.colors.lightGray}`,
    [theme.breakpoints.only("lg")]: {
      width: "98% !important",
    },
  },

  iconInputFilter: {
    position: "absolute",
    right: "14px",
    top: "10px",
  },
  btShowInformation: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    color: "white",
    background: theme.colors.primary,
    borderRadius: "4px",
    padding: "5px 15px",
    cursor: "pointer",
  },
  table: {
    border: `1px solid ${theme.colors.lightGray}`,
  },
  loadingContainer: {
    height: "60vh",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
}))(ListUserValidation);

ListUserValidation.propTypes = {
  classes: PropTypes.object,
};
