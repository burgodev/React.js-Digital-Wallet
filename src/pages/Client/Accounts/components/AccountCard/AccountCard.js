import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import RefreshIcon from '@material-ui/icons/Refresh';
import Skeleton from "@material-ui/lab/Skeleton";

import ModalTransfer from "../ModalTransfer"
import {
  Flex,
  Typography,
  Button,
  Card,
  Divider,
} from "../../../../../_common/components";
import { TransactionTypes } from "../../../../../services/data/transactionTypes";
import { ACCOUNT_LEVERAGE } from "../../../../../_common/utils/constants"
import { formatCurrency } from "../../../../../_common/utils/functions"
import { useSnackbar } from "../../../../../_common/hooks";
import api from "../../../../../services/api";
import ModalTransferConfirmation from "../ModalTransferConfirmation";


const AccountCard = ({ classes, data, ...props }) => {
  const i18n = useTranslation().t;
  const [openModal, setOpenModal] = useState(false)
  const [transactionInitial, setTransactionInitial] = useState(null)
  const [account, setAccount] = useState({})
  const [loading, setLoading] = useState(false)
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false)
  const [openSnackbar] = useSnackbar();


  const openTransferModal = (type, entity) => {
    if (type === TransactionTypes.APPLICATION) {
      setTransactionInitial({ to: entity, name: data.name })
    } else if (type === TransactionTypes.RESCUE) {
      setTransactionInitial({ from: entity, name: data.name })
    }
    setOpenModal(true);
  }

  const updateBalance = async (id) => {
    try {
      setLoading(true);
      const { data } = await api.put(
        `/operation-account/sync-balance`, {
        operation_account_id: id
      }
      );
      setAccount(data.payload)
    } catch (e) {
      openSnackbar(e.response?.data.message, "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setAccount(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card className={classes.card} style={{ justifyContent: !data.is_demo ? "space-between" : "flex-start" }} {...props}>
      <Flex center flexDirection="column" >
        <Flex center>
          <Typography fontSize={22} fontWeight={500} className={classes.name}>
            {account.name}
          </Typography>
          <Button variant="icon" className={classes.reloadButton} onClick={() => updateBalance(account.id)}>
            <RefreshIcon className={classes.reloadIcon} size="medium" />
          </Button>
        </Flex>
        <Divider margin={"16px 0 24px"} />
      </Flex>
      <Flex flexDirection="column">
        <Flex
          className={classes.flexId}
        >
          {/* <Typography fontSize={18}>#{account.id}</Typography> */}
          {/* <Divider margin={!account.is_demo ? "8px 0 16px" : "16px 0 24px"} /> */}
        </Flex>

        <Flex className={classes.flex} alignItems="flex-end" justifyContent="space-between">
          <Typography fontSize={18} fontWeight={500}>{i18n("accountCard.balance")}</Typography>
          <Flex
            className={classes.flex}
            width="50%"
            flexDirection="column"
            alignItems="flex-end"
            justifyContent="center"
          >
            {loading ? (<Skeleton variant="rect" width={60} height={30} />) : (<Typography fontSize={26}>{formatCurrency(account.balance)}</Typography>)}
            <Divider className={classes.divider} />
          </Flex>
        </Flex>

        {/*     <Flex className={classes.flex} justifyContent="space-between">
        <Typography>{i18n("accountCard.signature")}</Typography>
        <Typography>Ativo (MOCKUP)</Typography>
      </Flex>
     <Flex className={classes.flex} justifyContent="space-between">
        <Typography>{i18n("accountCard.category")}</Typography>
        <Typography>{account.operation_type}</Typography>
      </Flex>
      <Flex className={classes.flex} justifyContent="space-between">
        <Typography>{i18n("accountCard.bot")}</Typography>
        <Typography>{account.robo_id}</Typography>
      </Flex> */}
        <Flex className={classes.flex} justifyContent="space-between">
          <Typography>{i18n("accountCard.currency")}</Typography>
          <Typography>{'USDX'}</Typography>
        </Flex>
        <Flex className={classes.flex} justifyContent="space-between">
          <Typography>{i18n("accountCard.accountType")}</Typography>
          <Typography>{account.spread_type}</Typography>
        </Flex>
        <Flex className={classes.flex} justifyContent="space-between">
          <Typography>{i18n("accountCard.leverage")}</Typography>
          <Typography>{ACCOUNT_LEVERAGE.find(({ id }) => id === account.leverage)?.text}</Typography>
        </Flex>
      </Flex>

      {!account.is_demo &&
        <Flex className={classes.flex} justifyContent="space-between">
          <Button onClick={() => openTransferModal(TransactionTypes.APPLICATION, account.id)} className={classes.button} >{i18n("accountCard.application")}</Button>
          <Button onClick={() => openTransferModal(TransactionTypes.RESCUE, account.id)} className={classes.button} secondary >{i18n("accountCard.withdrawal")}</Button>
        </Flex>
      }
      <ModalTransfer balance={account.balance} open={openModal} initial={transactionInitial} onClose={() => { setOpenModal(false); setOpenModalConfirmation(true) }} />
      <ModalTransferConfirmation open={openModalConfirmation} onClose={() => setOpenModalConfirmation(false)} />
    </Card>
  );
}


AccountCard.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
};

export default withStyles((theme) => ({
  card: {
    padding: "16px 24px 24px",
    height: 380,
    width: 380,
    background: theme.palette.white,
    boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.25)",
    borderRadius: 20,
    flexDirection: "column",
    aligmItems: "center",
    margin: "0 8px",
    display: "flex",
    // justifyContent: "space-between",
    // cursor: "pointer",
    transition: "all ease 0.5s",
    transform: "scale(0.95)",
    "&:hover": {
      transform: "scale(1)",
    },
    [theme.breakpoints.down("lg")]: {
      height: 320,
      width: 320,
    },
  },
  divider: {
    width: 65,
    height: 6,
    background: theme.palette.main,
    color: theme.palette.main,
    borderRadius: 209,
    opacity: 1,
    border: "none",
    boxShadow: "none"
  },
  flex: {
    padding: "2px 0",
  },
  name: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textoverflow: "ellipsis",
  },
  button: {
    width: "47.5%",
    height: 36,
    marginTop: 32,
  },
  flexId: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "2px 0",
  },
  reloadButton: {
    marginLeft: '10px',
  },
  reloadIcon: {
    color: "#C6C6C6",

  }
}))(AccountCard);
