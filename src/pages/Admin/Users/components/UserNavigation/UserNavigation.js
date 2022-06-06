import React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import Flex from "../../../../../_common/components/Flex";
import { Link } from "react-router-dom";

function UserNavigation({ classes, ...props }) {
  const location = useLocation();

  return (
    <div {...props}>
      <Link to="/admin/users" className={classes.navTextInicio}>
        <ArrowBackIcon className={classes.icon} />
        Início
      </Link>
      <Flex className={classes.flex}>
        <Link
          className={classes.navText}
          to="/admin/users/user"
          style={{
            fontWeight:
              location.pathname === "/admin/users/user" ? "bold" : "normal",
          }}
        >
          Painel do perfil
        </Link>
        <Link
          className={classes.navText}
          to="/admin/users/user/data"
          style={{
            fontWeight:
              location.pathname === "/admin/users/user/data"
                ? "bold"
                : "normal",
          }}
        >
          Dados do usuário
        </Link>
        <Link
          className={classes.navText}
          to="/admin/users/user/transactions"
          style={{
            fontWeight:
              location.pathname === "/admin/users/user/transactions"
                ? "bold"
                : "normal",
          }}
        >
          Transações
        </Link>
        <Link
          className={classes.navText}
          to="/admin/users/user/extract"
          style={{
            fontWeight:
              location.pathname === "/admin/users/user/extract"
                ? "bold"
                : "normal",
          }}
        >
          Extrato
        </Link>
      </Flex>
    </div>
  );
}
export default withStyles((theme) => ({
  navText: {
    fontSize: 16,
    color: "#398CBF",
    textDecoration: "none",
    cursor: "pointer",
    margin: "0 22px",
  },

  navTextInicio: {
    textDecoration: "none",
    cursor: "pointer",
    marginBottom: 32,
    display: "flex",
    alignItems: "center",
    color: "#398CBF",
  },
  flex: {
    alignItems: "center",
    paddingLeft: 80,
    width: 1239,
    height: 56,
    background: "#FFFFFF",
    borderRadius: 27,
    marginBottom: 48,
  },
  icon: {
    marginRight: 8,
  },
}))(UserNavigation);

UserNavigation.propTypes = {
  classes: PropTypes.object,
};
