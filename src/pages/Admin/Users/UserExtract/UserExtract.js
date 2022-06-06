import React, { useState, useCallback } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

// import api from "../../../../services/api";
import { Flex, Filter, Table } from "../../../../_common/components";
import UserNavigation from "../components/UserNavigation/UserNavigation";

function UserExtract({ classes }) {
  const [filter, setFilter] = useState();
  const filterCallback = useCallback((value) => setFilter(value), []);

  const getUserList = async () => {
    console.log("filter", filter);
    return MOCKUP;
  };

  return (
    <Flex flexDirection="column" style={{ padding: 40 }}>
      <UserNavigation />
      <Filter filterList={filterList} callback={filterCallback} />
      <Table tableHead={tableHead} onFetch={getUserList} pagination />
    </Flex>
  );
}

const MOCKUP = [
  {
    id: 0,
    date: "10/10/2021",
    account: "Filipe",
    description: "5.148.017",
    value: "$6000",
  },
  {
    id: 2,
    date: "10/10/2021",
    account: "Filipe",
    description: "5.148.017",
    value: "$6000",
  },
  {
    id: 3,
    date: "10/10/2021",
    account: "Filipe",
    description: "5.148.017",
    value: "$6000",
  },
];

const filterList = [
  {
    name: "date",
    type: "date",
    label: "Data solicitação",
  },
  {
    name: "account",
    type: "select",    
    list: [
      {
        id: 0,
        text: "66513",
      },
      {
        id: 1,
        text: "86452",
      },
    ],
    label: "Conta",
  },

  {
    name: "description",
    type: "text",
    label: "Descrição",
  },
  {
    name: "value",
    type: "text",
    label: "Valor",
  },
];

const tableHead = [
  {
    text: "Data solicitação",
    id: 1,
  },
  {
    text: "Conta",
    id: 2,
  },
  {
    text: "Descrição",
    id: 3,
  },
  {
    text: "Valor",
    id: 4,
  },
];

export default withStyles((theme) => ({}))(UserExtract);

UserExtract.propTypes = {
  classes: PropTypes.object,
};
