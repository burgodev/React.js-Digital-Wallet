import React, { useState, useCallback } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

// import api from "../../../../services/api";
import { Flex, Filter, Table } from "../../../../_common/components";
import UserNavigation from "../components/UserNavigation/UserNavigation";

function UserTransactions({ classes }) {
  const [filter, setFilter] = useState();
  const filterCallback = useCallback((value) => setFilter(value), []);

  const getUserList = async () => {
    console.log("filter", filter);

    return MOCKUP;
  };

  return (
    <Flex className={classes.flex}>
      <UserNavigation />
      <Flex className={classes.flexFilter}>
        <Filter filterList={filterList} callback={filterCallback} noFlex />
      </Flex>
      <Table tableHead={tableHead} onFetch={getUserList} pagination />
    </Flex>
  );
}

const MOCKUP = [
  {
    id: 0,
    solicitationDate: "10/10/2021",
    account: "Filipe",
    processingDate: "10/10/2021",
    wallet: "5.148.017",
    currency: "$6000",
    amountReceived: "$6000",
    price: "$5,14",
    value: "$5,14",
  },
  {
    id: 1,
    solicitationDate: "10/10/2021",
    account: "Filipe",
    processingDate: "10/10/2021",
    wallet: "5.148.017",
    currency: "$6000",
    amountReceived: "$6000",
    price: "$5,14",
    value: "$5,14",
  },
  {
    id: 2,
    solicitationDate: "10/10/2021",
    account: "Filipe",
    processingDate: "10/10/2021",
    wallet: "5.148.017",
    currency: "$6000",
    amountReceived: "$6000",
    price: "$5,14",
    value: "$5,14",
  },
];

const filterList = [
  {
    name: "date",
    type: "date",
    label: "Data solicitação",
  },
  {
    name: "currency",
    type: "select",
    list: [
      {
        id: 0,
        text: "BRL",
      },
      {
        id: 1,
        text: "USD",
      },
    ],
    label: "Moeda",
  },

  {
    name: "account",
    type: "text",
    label: "Conta",
  },

  {
    name: "wallet",
    type: "text",
    label: "Carteira",
  },
  {
    name: "depositAmount",
    type: "number",
    label: "Valor de depósito",
  },
  {
    name: "withdrawalValue",
    type: "number",
    label: "Valor de saque",
  },
];

const tableHead = [
  {
    text: "Data Solicitação",
    id: 1,
  },
  {
    text: "Conta",
    id: 2,
  },
  {
    text: "Data processamento",
    id: 3,
  },
  {
    text: "Carteira",
    id: 4,
  },
  {
    text: "Moeda",
    id: 5,
  },
  {
    text: "Montante recebido",
    id: 6,
  },
  {
    text: "Cotação",
    id: 7,
  },
  {
    text: "Valor",
    id: 8,
  },
];

export default withStyles((theme) => ({
  flexFilter: {
    width: "70%",
    flexWrap: "wrap",
    height: 120,
  },
  flex: {
    padding: 40,
    flexDirection: "column",
  },
}))(UserTransactions);

UserTransactions.propTypes = {
  classes: PropTypes.object,
};
