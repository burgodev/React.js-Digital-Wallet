import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import { useSelector } from "react-redux";
import { withStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import api from "../../../../../services/api";

import { Typography, Card, Button, Divider } from "../../..";

PropTypes.propTypes = {
  classes: PropTypes.object,
  callback: PropTypes.func.isRequired,
};

const Welcome = ({ classes, callback }) => {
  // const user = useSelector((state) => state.user.data);
  const [firstName, setFirstName] = useState("");
  const i18n = useTranslation().t;

  useEffect(() => {
    const getUserInformation = async () => {
      try {
        const { data } = await api.get("user/profile");
        setFirstName(data.payload.first_name);
      } catch (error) { }
    };
    getUserInformation();
  }, []);

  return (
    <Card clean className={classes.container}>
      <Typography className={classes.subtitle}>{i18n("modalTutorial.welcome")}</Typography>
      <Typography className={classes.user}>{firstName || "User"}</Typography>
      <Divider className={classes.divider} />
      <Typography className={classes.typography}>
        {i18n("modalTutorial.description")}
      </Typography>
      <Button onClick={callback}>{i18n("button.letsGo")}</Button>
    </Card>
  );
};

export default withStyles((theme) => ({
  container: {
    height: "72.5%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "16px",
  },
  user: {
    fontSize: 34,
    paddingTop: "12px",
    width: "85%",
    textAlign: "center",
  },
  typography: {
    textAlign: "center",
    marginTop: 55,
    marginBottom: 20,
    width: "60%",
    lineHeight: "18px",
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 35,
  },
  divider: {
    width: 65,
    height: 6,
    background: theme.palette.main,
    color: theme.palette.main,
    borderRadius: 209,
    opacity: 1,
    border: "none",
  },
}))(Welcome);
