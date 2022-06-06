import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import NavHeaderTransactions from "../../../components/Admin/NavHeaderTransactions";
import api from "../../../services/api";

import Typography from "../../../_common/components/Typography";
import Flex from "../../../_common/components/Flex";
import { theme } from "../../../_common/utils/theme";
import dolarSign from '../../../assets/images/dolar-sign.svg';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Pagination from "@material-ui/lab/Pagination";
import { FiCalendar, FiSearch } from "react-icons/fi";

function TransactionDeposit({ classes }) {
  const [allTickets, setAllTickets] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);

  const tableHead = [
    {
      name: "Data Solicitação",
      id: 1,
    },
    {
      name: "Valor USD",
      id: 2,
    },
    {
      name: "Valor",
      id: 3,
    },
    {
      name: "Moeda",
      id: 4,
    },
    {
      name: "Usuário",
      id: 5,
    },
    {
      name: "Endereço",
      id: 6,
    },
  ];

  const handleChange = (e, value) => {
    setPage(value);
    setCurrentPage(value);
  };

  useEffect(() => {
    api
      .get("support/ticketall", {
        headers: {
          userID: 6,
        },
        params: {
          page: currentPage,
          amountItens: 10,
        },
      })
      .then((res) => {
        setAllTickets(res.data.tickets);
        setTotalPages(res.data.totalPages);
      });
  }, []);

  return (
    <Flex flexDirection="column">
      <NavHeaderTransactions />
      <Flex>
        <Flex
          flexDirection="column"
          width="14%"
          className={classes.boxInputFilter}
        >
          <Typography textAlign="left">Data solicitação</Typography>
          <input className={classes.inputFilters} style={{ paddingLeft: "40px"}}></input>
          <FiCalendar
            className={classes.iconInputFilter}
            size={23}
            color="gray"
          />
        </Flex>
        <Flex
          flexDirection="column"
          width="14%"
          className={classes.boxInputFilter}
        >
          <Typography textAlign="left">Valor</Typography>
          <input className={classes.inputFilters} style={{ paddingLeft: "40px"}}/>          
          <img src={dolarSign} className={classes.iconImageInputFilter} alt="" />
        </Flex>
        <Flex flexDirection="column" width="14%" className={classes.boxInputFilter}>
          <Typography textAlign="left">Usuário</Typography>
          <input className={classes.inputFilters} />
          <FiSearch
            className={classes.iconInputFilter}
            style={{ right: "25px", left: "unset"}}
            size={23}
            color="gray"
          />
        </Flex>
        <Flex flexDirection="column" width="14%">
          <Typography textAlign="left">Status</Typography>
          <select className={classes.inputFilters}>
              <option>Status</option>
          </select>
        </Flex>
        <Flex flexDirection="column" width="14%">
          <Typography textAlign="left">Carteira</Typography>
          <input className={classes.inputFilters} style={{ width: "435px"}} />
        </Flex>
      </Flex>
      <Table className={classes.table}>
        <TableHead>
          <TableRow style={{ background: "white" }}>
            {tableHead.map((tableHead) => (
              <TableCell
                align="center"
                key={tableHead.name}
                className={classes.tableHeader}
              >
                <Typography fontSize="0.95rem" fontWeight={600}>
                  {tableHead.name}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {allTickets.map((ticket) => (
            <TableRow key={ticket.id} className={classes.tableRow}>
              <TableCell
                component="th"
                scope="row"
                className={`${classes.tableCellRadiusLeft} ${classes.tableBorderBottom}`}
                align="center"
              >
                <Typography fontSize="0.85rem">
                  {`${ticket.dateOpen.substr(0, 10)} / ${ticket.dateOpen.substr(
                    11,
                    5
                  )} `}
                </Typography>
              </TableCell>
              <TableCell align="center" className={classes.tableBorderBottom}>
                <Typography fontSize="0.85rem">{ticket.subject}</Typography>
              </TableCell>
              <TableCell align="center" className={classes.tableBorderBottom}>
                <Typography fontSize="0.85rem">{ticket.status}</Typography>
              </TableCell>
              <TableCell align="center" className={classes.tableBorderBottom}>
                <Typography fontSize="0.85rem">{ticket.status}</Typography>
              </TableCell>
              <TableCell align="center" className={classes.tableBorderBottom}>
                <Typography fontSize="0.85rem">{ticket.status}</Typography>
              </TableCell>
              <TableCell
                align="center"
                className={`${classes.tableCellRadiusRight} ${classes.tableBorderBottom}`}
              >
                <Typography fontWeight={600} color="#f5c904">
                  25% processado
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Flex alignItems="center" className={classes.boxTotalValue}>
          <Typography fontWeight={500} fontSize="1.1rem" color={theme.colors.text} style={{ opacity: "0.5" }}>Valor total:</Typography>
          <Typography fontWeight={600} fontSize="1.1rem" style={{ marginLeft: "10px" }}>9.900.000,00</Typography>
      </Flex>
      <Flex center={true} style={{ margin: "25px 0px" }}>
        <Pagination count={totalPages} page={page} onChange={handleChange} />
      </Flex>
    </Flex>
  );
}
export default withStyles((theme) => ({
  boxInputFilter: {
    position: "relative",
  },
  inputFilters: {
    background: "#DCDCDC",
    height: "39px",
    width: "200px",
    border: "none",
    borderRadius: "5px",
    margin: "4px 10px 0 0",
    padding: "0 10px",
    fontSize: "1rem"    
  },
  iconInputFilter: {
    position: "absolute",
    opacity: "0.5",
    top: "28px",
    left: "10px",
    
  },
  iconImageInputFilter: {
    position: "absolute",    
    top: "29px",
    left: "10px",
    width: "22px"
  },
  table: {
    width: "100%",
    minWidth: 700,
    borderCollapse: "collapse",
    marginTop: "30px",
  },
  tableHeader: {
    fontSize: "1.05rem",
    fontWeight: 600,
    color: theme.colors.text,
    "&:nth-child(1)": {
      borderBottomLeftRadius: "15px",
      borderTopLeftRadius: "10px",
    },
    "&:last-child": {
      borderBottomRightRadius: "15px",
      borderTopRightRadius: "10px",
    },
    borderRight: "0.8px solid #b6b6b66c",
    borderBottom: "8px solid #E5E5E5",
  },
  tableRow: {
    background: "white",
    paddingBottom: "10px",
  },

  tableCellRadiusLeft: {
    borderBottomLeftRadius: "10px",
    borderTopLeftRadius: "10px",
  },
  tableCellRadiusRight: {
    borderBottomRightRadius: "10px",
    borderTopRightRadius: "10px",
  },
  tableBorderBottom: {
    borderBottom: "4px solid #E5E5E5",
  },
  boxTotalValue: {
    background: "#DCDCDC",
    padding: "20px 15px",
    borderRadius: "10px"
  }
}))(TransactionDeposit);

TransactionDeposit.propTypes = {
  classes: PropTypes.object,
};
