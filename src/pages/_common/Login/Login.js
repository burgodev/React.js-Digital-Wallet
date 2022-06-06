import React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import { Container } from "../../../_common/components";
import LoginForm from "./components/LoginForm";
import loginBackground from "../../../assets/images/loginBackground.jpg";

const Login = ({ classes }) => {
  return (
    <Container className={classes.container}>
      <LoginForm />
    </Container>
  );
}
export default withStyles((theme) => ({
  container: {
    height: "100vh",
    width: "100vw",
    backgroundImage: `linear-gradient(to right, #eaeaea , rgb(255 255 255 / 0%)),url(${loginBackground})`,
    backgroundSize: "contain",
    backgroundPositionX: "right",
    display: "flex",    
    alignItems: "center",
    paddingLeft: "10vw",
    [theme.breakpoints.down("lg")]: {
      paddingLeft: "0",
      justifyContent: "center"
    },
  },

}))(Login);

Login.propTypes = {
  classes: PropTypes.object,
};
