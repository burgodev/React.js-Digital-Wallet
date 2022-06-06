import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

import { Typography, Card, Button, Divider, Flex } from "../../../../../../_common/components";
import { useSnackbar } from "../../../../../../_common/hooks"

PropTypes.propTypes = {
  classes: PropTypes.object,
  item: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  showReprove: PropTypes.func.isRequired,

};

const Evaluate = ({ classes, onClose, showReprove, item }) => {
  const [loading, setLoading] = useState(false)
  const [openSnackbar] = useSnackbar();

  const handleSubmit = () => {
    try {
      openSnackbar("Avaliado com sucesso", "success")
      console.log("item", item)
    } catch (e) {
      openSnackbar(e.response.data.message, "error")
    } finally {
      setLoading(false)
      onClose();
    }
  }
  return (
    <Card clean className={classes.accountType}>
      <Flex center flexDirection="column">
        <Typography className={classes.subtitle} width="80%">
          Você deseja aprovar ou reprovar essa solicitação?
        </Typography>
        <Divider className={classes.divider} margin="0 0 60px" />
      </Flex>
      <Flex center>
        <Button onClick={() => handleSubmit()} className={classes.button} loading={loading}>
          Aprovar
        </Button>
        <Button onClick={showReprove} secondary className={classes.button} loading={loading}>
          Reprovar
        </Button>
      </Flex>
    </Card>
  );
};

export default withStyles((theme) => ({
  subtitle: {
    fontWeight: "bold",
    fontSize: 28,
  },
  accountType: {
    height: "67.5%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "16px",
  },
  button: {
    margin: "0 8px",
    height: 48,
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
}))(Evaluate);
