import React from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

import { Typography, Flex } from "../../../_common/components";
import { theme } from "../../../_common/utils/theme";

import coinBaseIcon from "../../../assets/images/coinbase.svg";
import blockChainIcon from "../../../assets/images/blockchain.svg";
import bgAdminHome from "../../../assets/images/bg-admin-home.svg";
import elipseAdminHome from "../../../assets/images/elipse-admin-home.svg";
import { Divider } from "@material-ui/core";

function Home({ classes }) {
  return (
    <Flex flexDirection="column" className={classes.positionRelative}>
      <Flex width="76%" className={classes.cardMainResume}>
        <Flex flexDirection="column" width="14%">
          <Typography
            textAlign="left"
            fontSize="2.4rem"
            margin="4px 0 0 0"
            fontWeight={600}
          >
            Capital
          </Typography>
          <Typography textAlign="left" fontWeight={600} margin="20px 0 0 0">
            Montante total dos clientes
          </Typography>
        </Flex>
        <Flex flexDirection="column" width="20%" style={{ marginLeft: "65px" }}>
          <Typography className={classes.cardMainTitleValues}>
            Valor total disponível
          </Typography>
          <Typography className={classes.cardMainValues} color="#58D400">
            $ 12.000.000,00
          </Typography>
        </Flex>
        <Flex flexDirection="column" width="20%" style={{ marginLeft: "35px" }}>
          <Typography className={classes.cardMainTitleValues}>
            Valor total bloqueado
          </Typography>
          <Typography className={classes.cardMainValues} color="#FF0505">
            $ 12.000.000,00
          </Typography>
        </Flex>
        <Flex flexDirection="column" width="20%" style={{ marginLeft: "35px" }}>
          <Typography className={classes.cardMainTitleValues} width="20%">
            Valor total
          </Typography>
          <Typography
            className={classes.cardMainValues}
            color={theme.colors.text}
          >
            $ 12.000.000,00
          </Typography>
        </Flex>
      </Flex>
      <Flex className={classes.cardExchangeContainer}>
        <Flex
          width="18%"
          flexDirection="column"
          center={true}
          className={classes.cardExchangeResume}
        >
          <Typography className={classes.exchangeTitle}>
            Coinbase
            <img src={coinBaseIcon} alt="coin base" />
          </Typography>
          <Typography margin="25px 0 0 0" fontSize="1.4rem">
            $ 7.444.444,00
          </Typography>
        </Flex>
        <Flex
          width="18%"
          flexDirection="column"
          center={true}
          className={classes.cardExchangeResume}
        >
          <Typography className={classes.exchangeTitle}>
            Blockchain
            <img
              src={blockChainIcon}
              className={classes.blockChainIcon}
              alt="blockchain"
            />
          </Typography>
          <Typography margin="25px 0 0 0" fontSize="1.4rem">
            $ 7.444.444,00
          </Typography>
        </Flex>
        <Flex
          width="18%"
          flexDirection="column"
          center={true}
          className={classes.cardExchangeResume}
        >
          <Typography className={classes.exchangeTitle}>
            Binance
            <img
              src="https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_512/74eaad903814407ebdfc3828fe5318ba.png"
              className={classes.binanceIcon}
              alt="binance"
            />
          </Typography>
          <Typography margin="25px 0 0 0" fontSize="1.4rem">
            $ 7.444.444,00
          </Typography>
        </Flex>
        <Flex
          width="18%"
          flexDirection="column"
          center={true}
          className={classes.cardExchangeResume}
        >
          <Typography
            textAlign="center"
            className={classes.cardMainTitleValues}
          >
            Valor total das exchanges
          </Typography>
          <Typography margin="25px 0 0 0" fontWeight={500} fontSize="1.5rem">
            $ 7.444.444,00
          </Typography>
        </Flex>
      </Flex>
      <Flex>
        <Flex
          width="18%"
          className={classes.cardPlatformResume}
          flexDirection="column"
          justifyContent="center"
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Typography fontSize="1.2rem" color="gray">
              Usuários
            </Typography>
            <Typography
              fontWeight={600}
              fontSize="1.4rem"
              className={classes.totalUsersTextCard}
            >
              50
            </Typography>
          </Flex>
          <Flex justifyContent="space-between" style={{ margin: "35px 0 0 0" }}>
            <Typography fontWeight={500}>Fisicas</Typography>
            <Typography
              fontWeight={600}
              fontSize="1.1rem"
              style={{ paddingRight: "15px" }}
            >
              50
            </Typography>
          </Flex>
          <Divider style={{ margin: "10px 0" }} />
          <Flex justifyContent="space-between">
            <Typography fontWeight={500}>Juridicas</Typography>
            <Typography
              fontWeight={600}
              fontSize="1.1rem"
              style={{ paddingRight: "15px" }}
            >
              50
            </Typography>
          </Flex>
        </Flex>
        <Flex
          width="18%"
          className={classes.cardPlatformResume}
          flexDirection="column"
          justifyContent="center"
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Typography
              fontSize="1.2rem"
              width="50%"
              textAlign="left"
              lineHeight="20px"
              color="gray"
            >
              Saques a vencer
            </Typography>
            <Typography
              fontWeight={600}
              fontSize="1.4rem"
              className={classes.totalUsersTextCard}
            >
              50
            </Typography>
          </Flex>
          <Flex
            justifyContent="space-between"
            style={{ margin: "35px 0 0 0", paddingRight: "15px" }}
          >
            <Typography fontWeight={500} color="#65BF88">
              Hoje
            </Typography>
            <Typography fontWeight={600} fontSize="1.1rem" color="#65BF88">
              50
            </Typography>
          </Flex>
          <Divider style={{ margin: "10px 0" }} />
          <Flex justifyContent="space-between" style={{ paddingRight: "15px" }}>
            <Typography fontWeight={500} color="#FF5C00">
              Amanhã
            </Typography>
            <Typography fontWeight={600} fontSize="1.1rem" color="#FF5C00">
              50
            </Typography>
          </Flex>
        </Flex>
        <Flex
          width="18%"
          className={classes.cardPlatformResume}
          flexDirection="column"
          style={{ maxHeight: "90px" }}
          justifyContent="center"
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Typography
              fontSize="1.2rem"
              width="50%"
              textAlign="left"
              lineHeight="20px"
              color="gray"
            >
              Documentos pendentes
            </Typography>
            <Typography
              fontWeight={600}
              fontSize="1.4rem"
              className={classes.totalUsersTextCard}
            >
              50
            </Typography>
          </Flex>
        </Flex>
      </Flex>
      <img src={bgAdminHome} alt="" className={classes.bgAdminHome} />
      <img src={elipseAdminHome} alt="" className={classes.elipseAdminHome} />
    </Flex>
  );
}

export default withStyles((theme) => ({
  positionRelative: {
    position: "relative",
    height: "75vh",
    margin: "0 0 0 50px",
  },
  bgAdminHome: {
    zIndex: "0",
    position: "absolute",
    bottom: "-120px",
    right: "0px",
  },
  elipseAdminHome: {
    zIndex: "0",
    position: "absolute",
    top: "0px",
    left: "-55px",
  },
  cardMainResume: {
    margin: "80px 0 50px 0",
    height: "150px",
    background: "white",
    borderRadius: "27px",
    padding: "40px",
    zIndex: "10",
  },
  cardMainTitleValues: {
    fontSize: "1.2rem",
    fontWeight: 400,
    textAlign: "left",
    color: "#161A31",
    opacity: "0.5",
    lineHeight: "20px",
    width: "80%",
  },
  cardMainValues: {
    fontSize: "1.5rem",
    textAlign: "left",
    fontWeight: 400,
    margin: "20px 0 0 0",
  },
  cardExchangeContainer: {
    marginBottom: "50px",
    zIndex: "10",
  },
  cardExchangeResume: {
    background: "white",
    borderRadius: "27px",
    marginRight: "20px",
    height: "160px",
    padding: "40px",
  },
  exchangeTitle: {
    display: "flex",
    alignItems: "center",
    color: theme.colors.text,
    fontWeight: 600,
    fontSize: "1.5rem",
    "& img": {
      marginLeft: "5px",
    },
  },
  blockChainIcon: {
    padding: "3px",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    borderRadius: "50%",
  },
  binanceIcon: {
    borderRadius: "50%",
    width: "35px",
    padding: "5px",
    background: "#161A31",
  },
  cardPlatformResume: {
    background: "white",
    borderRadius: "27px",
    height: "175px",
    padding: "25px",
    margin: "0 20px 0 0",
  },
  totalUsersTextCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: theme.colors.text,
    borderRadius: "50%",
    height: "50px",
    width: "50px",
    color: "white",
  },
}))(Home);

Home.propTypes = {
  classes: PropTypes.object,
};
