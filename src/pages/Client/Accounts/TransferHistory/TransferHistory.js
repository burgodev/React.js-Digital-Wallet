import React, { useState, useCallback, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import {
  Container,
  Table,
  Navigation,
} from "../../../../_common/components";
import api from "../../../../services/api";
import { useNavigation, useTableHead, useSnackbar } from "../../../../_common/hooks";
import { formatCurrency } from "../../../../_common/utils/functions"

const TransferHistory = ({ classes }) => {
  const [loading, setLoading] = useState(false);
  const navList = useNavigation("accounts");
  const [transferHistory, setTransferHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [orderBy, setOrderBy] = useState("DESC");
  const [orderType /*setOrderType*/] = useState("processed_at");
  const [openSnackbar] = useSnackbar();

  const tableHead = useTableHead("transaction_history")

  const getTransferHistory = useCallback(async () => {
    const resultApi = [];
    const resultApiTreated = []
    try {
      setLoading(true);
      const dataTransfer = await api.get(
        `/client/transaction-history?type=transfer&page=${page}&order_type=${orderType}&order_by=${orderBy}`
      );
      const dataRescue = await api.get(
        `/client/transaction-history?type=rescue&page=${page}&order_type=${orderType}&order_by=${orderBy}`
      );

      resultApi.push(dataTransfer.data.payload)
      resultApi.push(dataRescue.data.payload)

      resultApi.forEach((eachType) => {
        eachType.list.forEach((transfer) => {
          resultApiTreated.push({
            processedAt: transfer.processed_at,
            address: transfer.userRoles.wallet.id,
            destiny: transfer.target,
            currency: "USDX",
            transferValue: formatCurrency(transfer.amount),
          })
        })
      })
      const pagesSum = resultApi.reduce((previousValue, currentValue) => previousValue + currentValue.pages,
        0)
      setTotalPages(pagesSum);
      setTransferHistory(resultApiTreated);
    } catch (e) {
      openSnackbar(e.response?.data.message, "error");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy, orderType, page]);

  useEffect(() => {
    getTransferHistory();
  }, [getTransferHistory]);

  console.log('totalPages', totalPages)
  return (
    <>
      <Navigation navList={navList} initialValue={"transferHistory"} />
      <Container className={classes.container}>
        <Table
          tableHead={tableHead}
          items={transferHistory}
          loading={loading}
          setPage={setPage}
          totalPages={totalPages}
          pagination={true}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          page={page}
        />
      </Container>
    </>
  );
};

export default withStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "32px 32px 0",
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
}))(TransferHistory);

TransferHistory.propTypes = {
  classes: PropTypes.object,
};
