import React, { useEffect, useState } from "react";
import { Avatar, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import Typography from "../../../../_common/components/Typography";
import Flex from "../../../../_common/components/Flex";
import Card from "../../../../_common/components/Card";
import { theme } from "../../../../_common/utils/theme";
import UserNavigation from "../components/UserNavigation/UserNavigation";

const UserDashboard = ({ classes }) => {
  const [data, setData] = useState([]);

  const getUserData = async () => {
    setData(MOCKUP);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Flex className={classes.wrapper}>
      <UserNavigation />

      <Flex className={classes.mainCardInformation}>
        <Flex flexDirection="column" alignItems="center">
          <Avatar className={classes.avatarLarge} />
          <Typography className={classes.name}>{data.name}</Typography>
        </Flex>
        <Flex flexDirection="column" justifyContent="center">
          <Typography className={classes.subtitle}>Saldo disponível</Typography>
          <Typography className={classes.balance} color={theme.palette.green}>
            {data.balanceAvailable}
          </Typography>
        </Flex>
        <Flex flexDirection="column" justifyContent="center">
          <Typography className={classes.subtitle}>Saldo bloqueado</Typography>
          <Typography className={classes.balance} color={theme.palette.red}>
            {data.blockedBalance}
          </Typography>
        </Flex>
        <Flex flexDirection="column" justifyContent="center">
          <Typography className={classes.subtitle}>Saldo total</Typography>
          <Typography className={classes.balance}>
            {data.totalBalance}
          </Typography>
        </Flex>
      </Flex>

      <Typography className={classes.title}>
        Lista de contas do usuário
      </Typography>

      <Flex>
        {data.cards?.map((card) => (
          <Card className={classes.operationAccountCard}>
            <Flex className={classes.flex}>
              <Typography className={classes.accountName}>
                {card.name}
              </Typography>
              <Flex flexDirection="column">
                <Typography textAlign="left" color={theme.palette.red}>
                  $ {card.blockedBalance}
                </Typography>
                <Typography textAlign="left" color={theme.palette.green}>
                  $ {card.totalBalance}
                </Typography>
              </Flex>
            </Flex>
            <Flex flexDirection="column">
              <Typography textAlign="right" color="gray">
                {card.id}
              </Typography>
              <Typography textAlign="right" color="gray" fontWeight={600}>
                ID CONTA
              </Typography>
              <Typography className={classes.balanceAvailable}>
                $ {card.balanceAvailable}
              </Typography>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Flex>
  );
};

const MOCKUP = {
  id: 0,
  img: "src",
  name: "Filipe Burgonovo",
  balanceAvailable: "$5000,00",
  blockedBalance: "$1000,00",
  totalBalance: "$6000,00",

  cards: [
    {
      id: 98632,
      name: "BOT SMART",
      blockedBalance: "2000,00",
      totalBalance: "4000,00",
      balanceAvailable: "4000,00",
    },
    {
      id: 92632,
      name: "BOT SMART",
      blockedBalance: "2000,00",
      totalBalance: "4000,00",
      balanceAvailable: "4000,00",
    },
    {
      id: 21632,
      name: "BOT SMART",
      blockedBalance: "2000,00",
      totalBalance: "4000,00",
      balanceAvailable: "4000,00",
    },
  ],
};

export default withStyles((theme) => ({
  mainCardInformation: {
    background: "white",
    borderRadius: "35px",
    height: "180px",
    padding: "25px",
    width: "60%",
    justifyContent: "space-around",
  },
  avatarLarge: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  operationAccountCard: {
    display: "flex",
    flexDirection: "row",
    margin: "0 32px 32px 0",

    background: "white",
    borderRadius: "25px",
    padding: "25px",
    justifyContent: "space-between",
    alignItems: "center",
    width: "360px",
  },

  name: {
    fontWeight: 500,
    fontSize: "1.5rem",
    color: theme.colors.text,
    textAlign: "left",
    margin: "15px 0 0 0",
  },
  wrapper: {
    flexDirection: "column",
    padding: 40,
  },
  subtitle: {
    textAlign: "left",
    width: "10%",
    margin: "0 0 15px 0",
    color: "gray",
  },
  balance: {
    textAlign: "left",
    fontWeight: 500,
    fontSize: "1.8rem",
  },
  title: {
    fontWeight: 600,
    fontSize: "1.2rem",
    textAlign: "left",
    margin: "35px 0 25px 0",
  },
  balanceAvailable: {
    fontSize: "1.5rem",
    margin: "110px 0 5px 0",
    width: "160px",
    textAlign: "right",
    fontWeight: 600,
    color: theme.colors.text,
  },
  accountName: {
    fontWeight: 700,
    fontSize: "1.4rem",
    textAlign: "left",
    color: theme.colors.text,
    width: "150px",
  },
  flex: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
}))(UserDashboard);

UserDashboard.propTypes = {
  classes: PropTypes.object,
};
