import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

import { Typography, Card, Button, Divider, Flex } from "../../../../../../../_common/components";

PropTypes.propTypes = {
  classes: PropTypes.object,
  callback: PropTypes.func.isRequired,
};

const Success = ({ classes, callback }) => {
  return (
    <Card clean className={classes.container}>
      <Flex center flexDirection="column">
        <Typography className={classes.subtitle}>Parabéns!</Typography>
        <Typography className={classes.subtitle}>Alterações realizadas com sucesso</Typography>
        <Divider className={classes.divider} />
      </Flex>

      <Button onClick={callback}>Vamos começar!</Button>
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
    justifyContent: "space-between"
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
    fontSize: 28,
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
}))(Success);
