import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import EmailIcon from "@material-ui/icons/Email";
import { useHistory } from "react-router-dom";
import loginBackground from "../../../../assets/images/loginBackground.jpg";

import {
  Flex,
  Button,
  Typography,
  Card,
  Container,
} from "../../../../_common/components";

PropTypes.propTypes = {
  classes: PropTypes.object,
  changeDisplay: PropTypes.func,
};

const CheckEmail = ({ classes, changeDisplay }) => {
  const history = useHistory();
  const i18n = useTranslation().t;
  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <EmailIcon className={classes.icon} />
        <Typography className={classes.typography}>
          {i18n("checkEmail.verify")}
        </Typography>
        <Typography element="p" textAlign="center">          
          {i18n("checkEmail.description")}
        </Typography>

        <Flex onClick={() => history.push("/")} className={classes.flex}>
          <Button width="100%">{i18n("checkEmail.understood")}</Button>
        </Flex>
      </Card>
    </Container>
  );
};

export default withStyles((theme) => ({
  card: {
    boxShadow: "10px 10px 50px rgba(0, 0, 0, 0.5)",
    padding: "32px 32px 32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: 420,
    width: 420,
    borderRadius: 20,
    background: "white",
  },
  typography: {
    color: theme.palette.blue,
    fontSize: 32,
    fontWeight: "700",
  },
  icon: {
    fontSize: 80,
    color: theme.palette.main,
  },
  flex: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    width: "100%",
  },
  container: {
    height: "100vh",
    width: "100vw",
    backgroundImage: `linear-gradient(to right, #eaeaea , rgb(255 255 255 / 0%)),url(${loginBackground})`,
    backgroundSize: "contain",
    backgroundPositionX: "right",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
  },
}))(CheckEmail);
