import React, { useCallback, useState } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";

// import api from "../../../../services/api";
import {
  Typography,
  Flex,
  Table,
  Filter,
} from "../../../../_common/components";
import api from "../../../../services/api";

const UserList = ({ classes }) => {
  const [filter, setFilter] = useState();
  const filterCallback = useCallback((value) => setFilter(value), []);
  const history = useHistory();
  console.log("filter", filter);

  const getUserList = async () => {
    try {
      const { data } = await api.get("/admin/users/all");
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex className={classes.container}>
      <Flex>
        <Link to="/admin/home" className={classes.navTextInicio}>
          <ArrowBackIcon className={classes.icon} />
          Início
        </Link>
      </Flex>

      <Typography textAlign="left" className={classes.titlePageUsers}>
        Lista de usuários
      </Typography>

      <Filter filterList={filterList} callback={filterCallback} />

      <Table
        tableHead={tableHead}
        onFetch={getUserList}
        pagination
        onClick={() => history.push("/admin/users/user")}
      />
    </Flex>
  );
};

const filterList = [
  {
    name: "date",
    type: "date",
    label: "Data cadastro",
  },
  {
    name: "name",
    type: "text",
    label: "Nome",
  },
  {
    name: "cpf",
    type: "text",
    label: "CPF",
  },
  {
    name: "email",
    type: "text",
    label: "Email",
  },
  {
    name: "status",
    type: "select",
    list: [
      {
        id: 0,
        text: "Ativo",
      },
      {
        id: 1,
        text: "Inativo",
      },
    ],
    label: "Status",
  },
];

const tableHead = [
  {
    text: "Data Cadastro",
    id: 1,
  },
  {
    text: "Nome",
    id: 2,
  },
  {
    text: "Número do documento",
    id: 3,
  },
  {
    text: "Status",
    id: 4,
  },
  {
    text: "Email",
    id: 5,
  },

];

// const MOCKUP = [
//   {
//     id: 0,
//     date: "10/10/2021",
//     name: "Filipe",
//     document: "5.148.017",
//     status: "Ativo",
//     email: "filipeburgonovo@gmail.com",
//     availableValue: "$5000",
//     blockedValue: "$1000",
//     totalValue: "$6000",
//   },
//   {
//     id: 2,
//     date: "10/10/2021",
//     name: "Filipe",
//     document: "5.148.017",
//     status: "Ativo",
//     email: "filipeburgonovo@gmail.com",
//     availableValue: "$5000",
//     blockedValue: "$1000",
//     totalValue: "$6000",
//   },
//   {
//     id: 3,
//     date: "10/10/2021",
//     name: "Filipe",
//     document: "5.148.017",
//     status: "Ativo",
//     email: "filipeburgonovo@gmail.com",
//     availableValue: "$5000",
//     blockedValue: "$1000",
//     totalValue: "$6000",
//   },
// ];

export default withStyles((theme) => ({
  titlePageUsers: {
    fontWeight: 700,
    fontSize: "2rem",
    color: theme.colors.text,
    margin: "0 0 50px 0",
  },
  container: {
    padding: 40,
    flexDirection: "column",
  },
  navTextInicio: {
    textDecoration: "none",
    cursor: "pointer",
    marginBottom: 32,
    display: "flex",
    alignItems: "center",
    color: "#398CBF",
  },
  icon: {
    marginRight: 8,
  },
}))(UserList);

UserList.propTypes = {
  classes: PropTypes.object,
};
