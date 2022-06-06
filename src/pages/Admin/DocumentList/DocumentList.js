import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

import Typography from "../../../_common/components/Typography";
import Flex from "../../../_common/components/Flex";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Pagination from "@material-ui/lab/Pagination";

import api from "../../../services/api";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FiCalendar, FiUser } from "react-icons/fi";

function DocumentList({ classes }) {
  const [allTickets, setAllTickets] = useState([]);
  const [percentage, setPercentage] = useState(35);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);

  const tableHead = [
    {
      name: "Data",
      id: 1,
    },
    {
      name: "Número do documento",
      id: 2,
    },
    {
      name: "Nome do usuário",
      id: 3,
    },
    {
      name: "Status",
      id: 4,
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
      <Typography textAlign="left" className={classes.titlePageDocuments}>Documentos</Typography>      
      <Flex>
          <Flex flexDirection="column" width="15%" className={classes.boxInputFilter}>
            <Typography textAlign="left">Data</Typography>
            <input className={classes.inputFilters}></input>
            <FiCalendar className={classes.iconInputFilter} size={23} color="gray" />
          </Flex>
          <Flex flexDirection="column" width="15%" className={classes.boxInputFilter}>
            <Typography textAlign="left">Nome</Typography>
            <input className={classes.inputFilters} />
            <FiUser className={classes.iconInputFilter} size={23} color="gray" />
          </Flex>
          <Flex flexDirection="column" width="15%">
            <Typography textAlign="left">Status</Typography>
            <input className={classes.inputFilters} />
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
                    {`${ticket.dateOpen.substr(
                      0,
                      10
                    )} / ${ticket.dateOpen.substr(11, 5)} `}
                  </Typography>
                </TableCell>
                <TableCell align="center" className={classes.tableBorderBottom}>
                  <Typography fontSize="0.85rem">{ticket.subject}</Typography>
                </TableCell>
                <TableCell align="center" className={classes.tableBorderBottom}>
                  <Typography fontSize="0.85rem">{ticket.status}</Typography>
                </TableCell>

                <TableCell
                  align="center"
                  className={`${classes.tableCellRadiusRight} ${classes.tableBorderBottom}`}
                >
                    
                  
                  <Typography fontWeight={600} color="#f5c904">25% processado</Typography>
                    <CircularProgressbar
                      strokeWidth={20}
                      className={classes.progressBar}
                      value={percentage}                      
                      background
                      styles={buildStyles({
                        strokeLinecap: "butt",
                        pathColor: `${
                          percentage <= 25
                            ? "#ff1201ee"
                            : percentage > 25 && percentage < 50
                            ? "#f5c904"
                            : percentage > 50 && percentage < 80
                            ? "#FF5C00"
                            : "#FFF"
                        }`,                        
                        backgroundColor: "#E0DFDF",                         
                      })}
                    />
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Flex center={true} style={{ margin: "25px 0px" }}>
          <Pagination count={totalPages} page={page} onChange={handleChange} />
        </Flex>
      
    </Flex>
  );
}

export default withStyles((theme) => ({
  titlePageDocuments: {
    fontWeight: 700,
    fontSize: "2rem",
    color: theme.colors.text,
    margin: "0 0 50px 0",
  },
  boxInputFilter: {
    position: "relative"
  },
  inputFilters: {
    background: "#DCDCDC",
    height: "39px",
    width: "200px",
    border: "none",
    borderRadius: "5px",
    margin: "4px 10px 0 0",  
  },
  iconInputFilter: {
    position: "absolute",
    opacity: "0.5",
    top: "28px",
    left: "10px"
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
  progressBar: {
      width: "30px",
      marginLeft: "10px"
  }
}))(DocumentList);

DocumentList.propTypes = {
  classes: PropTypes.object,
};
