import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

import { Typography, Card, Button, Divider, Flex } from "../../../../../../../_common/components";

PropTypes.propTypes = {
  classes: PropTypes.object,
  nextStep: PropTypes.func.isRequired,
};

const Welcome = ({ classes, nextStep }) => {
    return (
    <Card clean className={classes.container}>
      <Flex center flexDirection="column">
        <Typography className={classes.typography}>
          Você deseja aprovar ou reprovar este gestor de contas?
        </Typography>
        <Divider className={classes.divider} />
      </Flex>

      <Button onClick={nextStep}>Continuar</Button>
    </Card>
  );
};

export default withStyles((theme) => ({
  container: {
    height: "65%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 16px 16px",
    justifyContent: "space-between"
  },
  typography: {
    fontSize: 28,
    fontWeight: 600
  },

  divider: {
    width: 65,
    height: 6,
    background: "#5FB6AB",
    color: "#5FB6AB",
    borderRadius: 209,
    opacity: 1,
    border: "none",
  },
}))(Welcome);
