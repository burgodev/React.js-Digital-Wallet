import React, { useState } from "react";
import moment from "moment";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  withStyles,
  Table as MuiTable,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import PropTypes from "prop-types";
import Pagination from "@material-ui/lab/Pagination";

import { Typography, Flex, Button, Container } from "../";

const Table = ({
  classes,
  loading,
  tableHead,
  totalPages,
  pagination,
  page,
  orderBy,
  setPage,
  setOrderBy,
  setOrderType,
  onClick,
  actions,
  items = [],
  ...props
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [rowId, setRowId] = useState();

  const handleChangePagination = (e, value) => {
    setPage(value)
  };

  const handleChangeOrder = () => {
    if (orderBy === "ASC") setOrderBy("DESC");
    else setOrderBy("ASC");
  };

  const handleClickMenu = (event, id) => {
    setRowId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (onClick, id) => {
    onClick(rowId);
    setAnchorEl(null);
  };

  if (loading)
    return (
      <>
        <Flex justifyContent="space-between" flexDirection="column">
          <Skeleton variant="rect" width={"100%"} height={60} />
        </Flex>
        <Flex
          justifyContent="space-between"
          flexDirection="column"
          style={{ height: 360, marginTop: 16 }}
        >
          <Skeleton variant="rect" width={"100%"} height={40} />
          <Skeleton variant="rect" width={"100%"} height={40} />
          <Skeleton variant="rect" width={"100%"} height={40} />
          <Skeleton variant="rect" width={"100%"} height={40} />
          <Skeleton variant="rect" width={"100%"} height={40} />
          <Skeleton variant="rect" width={"100%"} height={40} />
          <Skeleton variant="rect" width={"100%"} height={40} />
          <Skeleton variant="rect" width={"100%"} height={40} />
        </Flex>
      </>
    );

  return (
    <Container className={classes.container} {...props}>
      <MuiTable className={classes.table}>
        <TableHead>
          <TableRow>
            {tableHead.map((item) => (
              <TableCell
                align="center"
                scope="row"
                key={item.id}
                width={item.width}
              >
                <Flex center>
                  <Typography fontSize="0.95rem" fontWeight={600}>
                    {item.text}
                  </Typography>
                  <Typography
                    className={classes.orderIconContainer}
                    element="a"
                    onClick={() => handleChangeOrder()}
                  >
                    {item.ordenation &&
                      (orderBy === "ASC" ? (
                        <ArrowDownwardIcon className={classes.orderIcon} />
                      ) : (
                        <ArrowUpwardIcon className={classes.orderIcon} />
                      ))}
                  </Typography>
                </Flex>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* ROWS MAP */}
          {items?.map((row) => (
            <TableRow
              key={row.id}
              onClick={onClick}
              style={{
                cursor: typeof onClick === "undefined" ? "auto" : "pointer",
                padding: 12,
              }}
            >
              {/* COLUMNS MAP */}
              {Object.keys(row).map(
                (key) =>
                  key !== "id" && (
                    <TableCell align="center" key={key}>
                      {row[key]?.toString().split("-").length === 3 ? (
                        <Typography fontSize="0.85rem">
                          {moment(row[key]).format("DD/MM/YYYY - HH:mm:ss")}{" "}
                        </Typography>
                      ) : (
                        <Typography fontSize="0.85rem">{row[key]}</Typography>
                      )}
                    </TableCell>
                  )
              )}
              {/* ACTIONS MAP*/}
              {actions && (
                <TableCell align="center">
                  <Flex center>
                    {actions.map((action) =>
                      action.type === "button" ? (
                        <Button
                          key={action.id}
                          onClick={() => action.onClick(row)}
                          className={classes.button}
                          width={action.width || "100%"}
                          secondary={action.secondary}
                        >
                          {action.text}
                        </Button>
                      ) : (
                        <div key={action.id}>
                          <Button
                            onClick={(e) => handleClickMenu(e, row.id)}
                            variant="icon"
                          >
                            <MoreVertIcon />
                          </Button>
                          <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            elevation={0}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                          >
                            {action.list.map(({ text, onClick }) => (
                              <MenuItem
                                key={text}
                                onClick={() => handleCloseMenu(onClick, row)}
                              >
                                {text}
                              </MenuItem>
                            ))}
                          </Menu>
                        </div>
                      )
                    )}
                  </Flex>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
      {pagination && (
        <Flex center className={classes.flexPagination}>
          <Pagination
            count={totalPages}
            setPage={setPage}
            page={page}
            onChange={handleChangePagination}
            size="large"
          />
        </Flex>
      )}
    </Container>
  );
};

export default withStyles((theme) => ({
  table: {
    border: `1px solid ${theme.colors.lightGray}`,
    marginBottom: "25px",
    maxHeight: "670px",
  },
  tableHeader: {
    backgroundColor: "#151a301a",
  },
  flexPagination: {
    margin: "8px 0px",
  },
  button: {
    height: 28,
    fontSize: 12,
    margin: "0 8px",
  },
  tableContainer: {
    minHeight: "670px",
  },
  orderIcon: {
    cursor: "pointer",
    maxWidth: "16px",
    maxHeight: "16px",
    marginTop: "4px",
    marginLeft: "4px",
  },
  flexCell: {
    display: "flex",
    alignItems: "center",
  },
  container: {
    [theme.breakpoints.down("sm")]: {      
      overflowX: "auto",
    },
  }
}))(Table);

Table.propTypes = {
  classes: PropTypes.object,
  tableHead: PropTypes.array.isRequired, // cabeçalho da tabela
  pagination: PropTypes.bool, // caracteriza se a tabela deve ter paginação ou não
  onClick: PropTypes.func, // função de onClick para row
  items: PropTypes.array.isRequired,
  actions: PropTypes.array,
};
