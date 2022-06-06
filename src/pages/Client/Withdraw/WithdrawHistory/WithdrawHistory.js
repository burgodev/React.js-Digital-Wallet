import React, { useState, useCallback, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import {
  Container,
  Table,
  Navigation,
  //Filter,
} from "../../../../_common/components";
// import {  /*filterList,*/ tableHead, MOCKUP } from "./utils";
import { useNavigation, useTableHead, useSnackbar } from "../../../../_common/hooks";
import { formatCurrency } from "../../../../_common/utils/functions"

import api from "../../../../services/api";

const WithdrawHistory = ({ classes }) => {
  // const [filter, setFilter] = useState();
  const navList = useNavigation("withdraw");
  // const filterCallback = useCallback((value) => setFilter(value), []);
  const [loading, setLoading] = useState(false);
  // const [selectedItem, setSelectedItem] = useState();
  const [withdrawList, setWithdrawList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [orderBy, setOrderBy] = useState("DESC");
  const [orderType /*setOrderType*/] = useState("processed_at");
  const [openSnackbar] = useSnackbar();

  const tableHead = useTableHead("deposit_history")

  const getWithdrawList = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(
        `/client/transaction-history?type=withdraw&page=${page}&order_type=${orderType}&order_by=${orderBy}`
      );
      const result = [];
      data.payload.list.forEach((deposit) => {
        result.push({
          processedAt: deposit.processed_at,
          address: deposit.userRoles.wallet.id,
          currency: "R$",
          tax: 0,
          depositValue: formatCurrency(deposit.amount),
        });
      });
      setTotalPages(data.payload.pages);
      setWithdrawList(result);
    } catch (e) {
      openSnackbar(e.response?.data.message, "error");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy, orderType, page]);

  // const filteredList = (item) => {
  //   if (
  //     filter.solicitationDate === "" ||
  //     item.solicitationDate === filter.solicitationDate
  //   )
  //     return item;
  // };

  useEffect(() => {
    getWithdrawList();
  }, [getWithdrawList]);

  return (
    <Container className={classes.container}>
      <Navigation navList={navList} initialValue={"withdrawHistory"} />

      {/* <Typography fontSize={28} fontWeight={600}>
          Histórico de Saques
        </Typography> */}
      {/* <Filter
          filterList={filterList}
          callback={filterCallback}
          className={classes.filter}
        /> */}

      <Table
        tableHead={tableHead}
        items={withdrawList}
        loading={loading}
        setPage={setPage}
        totalPages={totalPages}
        pagination={true}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        page={page}
      />
    </Container>
  );
};

export default withStyles((theme) => ({
  table: {
    padding: 32,
  },
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  title: {
    fontSize: 36,
    color: theme.palette.secondary.main,
    // marginBottom: 48,
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
    margin: "8px 0 18px",
  },
}))(WithdrawHistory);

WithdrawHistory.propTypes = {
  classes: PropTypes.object,
};
