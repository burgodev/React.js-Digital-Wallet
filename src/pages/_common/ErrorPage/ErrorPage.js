import React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { Container, Typography, Button, Card } from "../../../_common/components";
import loginBackground from "../../../assets/images/loginBackground.jpg";
import cactus from "../../../assets/images/cactus.jpg";


const ErrorPage = ({ classes }) => {
  const history = useHistory();
  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <img
          src={cactus}
          alt="cactus"
          height="20%"
          className={classes.img}
        />
        <Typography fontWeight="bold" fontSize={48}>
          404
        </Typography>
        <Typography fontWeight="bold" fontSize={24}>
          Ooops! <br />
          Page Not Found
        </Typography>
        <Typography element="p" width="60%" margin="16px 0">
          Esta pagina não existe ou foi removida...
          Sugerimos que volte para página anterior
        </Typography>

        <Button onClick={() => history.goBack()} className={classes.button}> Voltar </Button>
      </Card>
    </Container>
  );
}
export default withStyles((theme) => ({
  card: {
    background: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "35%",    
    borderRadius: 20

  },
  container: {
    height: "100vh",
    width: "100vw",
    backgroundImage: `linear-gradient(to right, #eaeaea , rgb(255 255 255 / 0%)),url(${loginBackground})`,
    backgroundSize: "contain",
    backgroundPositionX: "right",
    display: "flex",
    grid: "100% / 50% 50%",
    alignItems: "center",
    padding: "20vh 10vw",
    flexDirection: "column",
  },
  button: {
    marginTop: 16,
    width: "80%",
    height: 52
  },
  img: {
    marginBottom: 16
  }
}))(ErrorPage);

ErrorPage.propTypes = {
  classes: PropTypes.object,
};
