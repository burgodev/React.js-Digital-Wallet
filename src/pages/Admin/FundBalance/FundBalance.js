import React, { useState, useCallback, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import {
  Container,
  Table,
  Loading,
  Typography,
  Filter,
} from "../../../_common/components";
import { filterList, tableHead, MOCKUP } from "./utils"
import ModalEvaluate from "./components/ModalEvaluate";

// import api from "../../../services/api";

const FundBalance = ({ classes }) => {
  const [filter, setFilter] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState(false);
  const filterCallback = useCallback((value) => setFilter(value), []);
  const [loading, setLoading] = useState(false);
  const [withdrawList, setWithdrawList] = useState([]);

  console.log("filter", filter)

  useEffect(() => {
    getWithdrawList();
  }, [])

  const getWithdrawList = async () => {
    try {
      setLoading(true);
      setWithdrawList(MOCKUP)
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const actionList = [
    {
      text: "Avaliar",
      type: "button",
      width: "100%",
      onClick: (row) => {
        setOpenModal(true)
        setItem(row)
      }
    },
  ]

  return (
    <Container className={classes.container}>
      <Typography fontSize={32} fontWeight={600} >Controle de Saldo no Fundo</Typography>
      <Filter filterList={filterList} callback={filterCallback} className={classes.filter} />
      {loading ?
        <Loading isLoading size={48} /> :
        <Table
          tableHead={tableHead}
          items={withdrawList}
          pagination
          actions={actionList}
        />}
      <ModalEvaluate open={openModal} item={item} onClose={() => setOpenModal(false)} />
    </Container>
  );
};

export default withStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "0px 32px",
  },
  title: {
    fontSize: 36,
    color: theme.palette.secondary.main,
  },
  button: {
    marginTop: 8,
    background: theme.palette.secondary.main,
    "&:hover": {
      background: theme.palette.secondary.main,
    },
    width: "100%",
  },
  filter: {
    margin: "32px 0 16px"
  }
}))(FundBalance);

FundBalance.propTypes = {
  classes: PropTypes.object,
};

