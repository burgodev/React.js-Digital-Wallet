import React from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

import Typography from "../../../_common/components/Typography";
import Flex from "../../../_common/components/Flex";
import Button from "../../../_common/components/Button";
import { theme } from "../../../_common/utils/theme";
import NavHeaderConfig from "../../../components/Admin/NavHeaderConfig";
import btcCoinImage from "../../../assets/images/btc-coin.svg";

function CoinConfig({ classes }) {
  return (
    <Flex flexDirection="column">
      <NavHeaderConfig />
      <Flex style={{ margin: "0 0 0 30px" }} flexDirection="column">
        <Typography textAlign="left" fontSize="1.2rem">
          Moedas cadastradas
        </Typography>
        <Flex>
          <Flex
            center={true}
            justifyContent="space-between"
            width="200px"
            className={classes.coinCardItem}
          >
            <Flex flexDirection="column">
              <Typography fontSize="1.5rem" fontWeight={500} textAlign="left">
                Bitcoin
              </Typography>
              <Typography fontSize="0.8rem" textAlign="left" margin="5px 0 0 0">
                Rede BTC
              </Typography>
            </Flex>
            <img src={btcCoinImage} alt="" className={classes.coinImage} />
          </Flex>
        </Flex>
        <Typography textAlign="left" className={classes.titlePage}>
          Cadastre novas moedas
        </Typography>
        <Flex flexDirection="column">
          <Typography textAlign="left">Nome</Typography>
          <input className={classes.inputFieldCoin}></input>
        </Flex>
        <Flex flexDirection="column">
          <Typography textAlign="left">Rede</Typography>
          <input className={classes.inputFieldCoin}></input>
        </Flex>
        <Flex flexDirection="column">
          <Typography textAlign="left">Sigla</Typography>
          <input className={classes.inputFieldCoin}></input>
        </Flex>
        <Button className={classes.btAddCoin}>Adicionar moeda</Button>
      </Flex>
    </Flex>
  );
}

export default withStyles((theme) => ({
  titlePage: {
    fontWeight: 700,
    fontSize: "1.8rem",
    color: theme.colors.text,
    margin: "50px 0",
  },
  coinCardItem: {
    background: "white",
    borderRadius: "14px",
    padding: "10px 15px",
    margin: "25px 0 0 0",
  },
  coinImage: {
    width: "65px",
  },
  inputFieldCoin: {
    width: "230px",
    height: "38px",
    background: "white",
    padding: "10px",
    border: "1px solid #B2D4E4",
    borderRadius: "5px",
    margin: "4px 0 20px 0",
  },
  btAddCoin: {
    height: "48px",
    width: "300px",
    textTransform: "unset",
    margin: "40px 0 0 0",
  },
}))(CoinConfig);

CoinConfig.propTypes = {
  classes: PropTypes.object,
};
