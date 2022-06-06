import React from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

import Typography from "../../../_common/components/Typography";
import Flex from "../../../_common/components/Flex";
import { theme } from "../../../_common/utils/theme";
import NavHeaderConfig from "../../../components/Admin/NavHeaderConfig";
import dolarSign from "../../../assets/images/dolar-sign.svg";

function FeeConfig({ classes }) {
  return (
    <Flex flexDirection="column">
      <NavHeaderConfig />
      <Flex alignItems="center" style={{ padding: "10px 0" }}>
        <Typography margin="0 8px 0 0" width="14%" textAlign="right">
          Taxa de saque (%)
        </Typography>
        <input
          className={classes.inputFields}
          name="email"
          type="email"
        ></input>
        <img src={dolarSign} alt="" className={classes.iconInput} />
      </Flex>
      <Flex alignItems="center" style={{ padding: "10px 0" }}>
        <Typography margin="0 8px 0 0" width="14%" textAlign="right">
          Taxa fixa de saque
        </Typography>
        <input
          className={classes.inputFields}
          name="email"
          type="email"
        ></input>
        <img src={dolarSign} alt="" className={classes.iconInput} />
      </Flex>
      <Flex alignItems="center" style={{ padding: "10px 0" }}>
        <Typography margin="0 8px 0 0" width="14%" textAlign="right">
          Taxa de transferência (%)
        </Typography>
        <input
          className={classes.inputFields}
          name="email"
          type="email"
        ></input>
        <img src={dolarSign} alt="" className={classes.iconInput} />
      </Flex>
    </Flex>
  );
}

export default withStyles((theme) => ({
  inputFields: {
    letterSpacing: "2px",
    fontSize: "1.1rem",
    background: "#DCDCDC",
    height: "45px",
    width: "50%",
    padding: "10px 10px 10px 40px",
    borderRadius: "8px",
    border: "none",
    position: "relative",
    "&:focus": {
      outline: "none",
      color: theme.colors.text,
    },
  },
  iconInput: {
    position: "absolute",
    zIndex: "1",
    left: "545px",
  },
}))(FeeConfig);

FeeConfig.propTypes = {
  classes: PropTypes.object,
};
