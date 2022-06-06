import React, { useState, useEffect, useCallback } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import AccountCard from "../components/AccountCard";
import {
  Button,
  Container,
  Navigation,
  ModalTutorial,
  Carousel
} from "../../../../_common/components";
import api from "../../../../services/api";
import { useNavigation, useSnackbar } from "../../../../_common/hooks";

const DemoAccount = ({ classes }) => {
  const i18n = useTranslation().t;
  const history = useHistory();
  const navList = useNavigation("accounts");
  const firstLogin = localStorage.getItem("first_login")
  const [open, setOpen] = useState(firstLogin === "false" ? false : true);
  const [demoAccounts, setDemoAccounts] = useState([])

  const [loading, setLoading] = useState(false)
  const [openSnackbar] = useSnackbar();


  const getDemoAccounts = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/operation-account/demo')
      const demoAcc = data.payload.filter((account) =>
        account.is_demo === true
      )
      setDemoAccounts(demoAcc)
    } catch (e) {
      openSnackbar(e.response?.data.message, "error");
    } finally {
      setLoading(false)
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getDemoAccounts()
  }, [getDemoAccounts])

 

  return (
    <>
      <Navigation navList={navList} initialValue={"demoAccount"} />
      <Container className={classes.container}>
        <Button
          onClick={() => history.push("/client/accounts/create-account/demo")}
          variant="text"
          className={classes.button}
        >
          <AddBoxIcon fontSize="large" className={classes.icon} />
          {i18n("demoAccount.title")}
        </Button>

        <Carousel length={demoAccounts.length} itemWidth={380} loading={loading}>
          {demoAccounts?.map((account) =>
            <AccountCard data={account} key={account.id}/>
            )}
        </Carousel>
        <ModalTutorial open={open} onClose={() => setOpen(false)} />
      </Container>
    </>
  );
}

DemoAccount.propTypes = {
  classes: PropTypes.object,
};

export default withStyles((theme) => ({
  container: {
    padding: "48px 0 48px 32px",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  carouselImages: {
    display: "flex",
    position: "relative",
    zIndex: "10",
    height: "100%",
    alignItems: "center",
    borderRadius: "10px",
    "&:": {
      height: "100%",
    },
    [theme.breakpoints.only("lg")]: {
      width: "100% !important",
      height: "100% !important",
    },
    [theme.breakpoints.down("md")]: {},
  },
  button: {
    marginBottom: 16,
    fontSize: 20,
    width: 300,
    textAling: "left",
    display: "flex",
    justifyContent: "flex-start",
    [theme.breakpoints.down("lg")]: {
      fontSize: 16
    },
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gridGap: "20px",
    width: "100%"
  },
  icon: {
    color: theme.palette.main,
    marginRight: 4
  }
}))(DemoAccount);
