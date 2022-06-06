import React, { useState, useCallback, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import {
  Container,
  Table,
  Navigation,
  // Filter,
} from "../../../../_common/components";
import api from "../../../../services/api";
import { useNavigation, useTableHead, useSnackbar } from "../../../../_common/hooks";
import { formatCurrency } from "../../../../_common/utils/functions"

const DepositHistory = ({ classes }) => {
  // const [filter, setFilter] = useState();
  // const filterCallback = useCallback((value) => setFilter(value), []);
  const navList = useNavigation("DEPOSIT");
  const [depositHistory, setDepositHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [orderBy, setOrderBy] = useState("DESC");
  const [orderType /*setOrderType*/] = useState("processed_at");
  const [openSnackbar] = useSnackbar();

  const tableHead = useTableHead("deposit_history")

  const [loading, setLoading] = useState(false);

  const getDepositHistory = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(
        `/client/transaction-history?type=deposit&page=${page}&order_type=${orderType}&order_by=${orderBy}`
      );

      const arr = data.payload.list.map((deposit) => ({
        processedAt: deposit.processed_at,
        address: deposit.userRoles.wallet.id,
        currency: "USDX",
        tax: 0,
        depositValue: formatCurrency(deposit.amount),
      }));
      setTotalPages(data.payload.pages);
      setDepositHistory(arr);
    } catch (e) {
      // console.log(e)
      openSnackbar(e.response?.data.message, "error");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy, orderType, page]);

  useEffect(() => {
    getDepositHistory();
  }, [getDepositHistory]);

  return (
    <>
      <Navigation navList={navList} initialValue={"depositHistory"} />
      <Container className={classes.container}>
        {/* <Typography className={classes.typography} >Histórico de Depósitos</Typography> */}
        {/* <Filter filterList={filterList} callback={filterCallback} className={classes.filter} /> */}

        <Table
          tableHead={tableHead}
          items={depositHistory}
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

// const filterList = [
//   {
//     name: "date",
//     type: "date",
//     label: "Data solicitação",
//   },
//   {
//     name: "status",
//     type: "select",
//     list: [
//       {
//         id: 0,
//         text: "Aprovado",
//       },
//       {
//         id: 1,
//         text: "Reprovado",
//       },
//       {
//         id: 2,
//         text: "Processando",
//       },
//     ],
//     label: "Status",
//   },
// ];

export default withStyles((theme) => ({
  typography: {
    fontSize: 28,
    fontWeight: 600,
    marginBottom: 32,
  },
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "32px 32px 0px 32px",
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
}))(DepositHistory);

DepositHistory.propTypes = {
  classes: PropTypes.object,
};

// const MOCKUP = [
//   {
//     id: 0,
//     solicitationDate: "10/10/2021",
//     processingDate: "10/10/2021",
//     status: "Ativo",
//     walletAdress: "8962-53316-98654-6523",
//     currency: "USDX",
//     tax: "$5,14",
//     withdrawalAmount: "$35,14",
//   },
//   {
//     id: 1,
//     solicitationDate: "10/10/2021",
//     processingDate: "10/10/2021",
//     status: "Ativo",
//     walletAdress: "8962-53316-98654-6523",
//     currency: "USDX",
//     tax: "$5,14",
//     withdrawalAmount: "$35,14",
//   },

//   {
//     id: 2,
//     solicitationDate: "10/10/2021",
//     processingDate: "10/10/2021",
//     status: "Ativo",
//     walletAdress: "8962-53316-98654-6523",
//     currency: "USDX",
//     tax: "$5,14",
//     withdrawalAmount: "$35,14",
//   },

//   {
//     id: 3,
//     solicitationDate: "10/10/2021",
//     processingDate: "10/10/2021",
//     status: "Ativo",
//     walletAdress: "8962-53316-98654-6523",
//     currency: "USDX",
//     tax: "$5,14",
//     withdrawalAmount: "$35,14",
//   },

//   {
//     id: 4,
//     solicitationDate: "10/10/2021",
//     processingDate: "10/10/2021",
//     status: "Ativo",
//     walletAdress: "8962-53316-98654-6523",
//     currency: "USDX",
//     tax: "$5,14",
//     withdrawalAmount: "$35,14",
//   },

//   {
//     id: 5,
//     solicitationDate: "10/10/2021",
//     processingDate: "10/10/2021",
//     status: "Ativo",
//     walletAdress: "8962-53316-98654-6523",
//     currency: "USDX",
//     tax: "$5,14",
//     withdrawalAmount: "$35,14",
//   },
//   {
//     id: 6,
//     solicitationDate: "10/10/2021",
//     processingDate: "10/10/2021",
//     status: "Ativo",
//     walletAdress: "8962-53316-98654-6523",
//     currency: "USDX",
//     tax: "$5,14",
//     withdrawalAmount: "$35,14",
//   },
//   {
//     id: 7,
//     solicitationDate: "10/10/2021",
//     processingDate: "10/10/2021",
//     status: "Ativo",
//     walletAdress: "8962-53316-98654-6523",
//     currency: "USDX",
//     tax: "$5,14",
//     withdrawalAmount: "$35,14",
//   },
//   {
//     id: 8,
//     solicitationDate: "10/10/2021",
//     processingDate: "10/10/2021",
//     status: "Ativo",
//     walletAdress: "8962-53316-98654-6523",
//     currency: "USDX",
//     tax: "$5,14",
//     withdrawalAmount: "$35,14",
//   },
// ];
