import React from "react";
import GetAppIcon from '@material-ui/icons/GetApp';
import { withStyles, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import notebook from "../../../assets/images/notebook.jpg";
import mt5logo from "../../../assets/images/mt5-horizontal.png";
import { Button, Typography, Navigation, Container } from "../../../_common/components";
import { useNavigation } from "../../../_common/hooks";

const Platforms = ({ classes }) => {
  const i18n = useTranslation().t;
  const navList = useNavigation("platforms");

  return (
    <Container className={classes.container} >
      <Navigation navList={navList} initialValue={"platforms"} />

      <Grid container spacing={4} className={classes.content}>
        <Grid item xs={12} md={6} className={classes.right}>
          <img
            src={notebook}
            // height={300}
            alt="notebook"
            className={classes.imgNotebook}
          />
        </Grid>
        <Grid item xs={12} md={6} className={classes.gridItem}>
          <img
            src={mt5logo}
            // height={100}
            className={classes.imgMt5}
            alt="metatrader"
          />
          <Typography element="p" className={classes.typography}>
            {i18n("platforms.description")}
          </Typography>
        </Grid>
      </Grid>

      <Button href="https://download.mql5.com/cdn/web/select.markets.llc/mt5/selectmarkets5setup.exe" target="_blank" className={classes.button} startIcon={<GetAppIcon className={classes.icon} />}>{i18n("button.downloadPlatform")}</Button>
    </Container >

  );
}

Platforms.propTypes = {
  classes: PropTypes.object,
};

export default withStyles((theme) => ({
  container: {
    justifyContent: "space-between",
    flexDirection: "column",
    display: "flex",
    alignItems: "center"
  },
  right: {
    textAlign: "right"
  },
  typography: {
    fontSize: 18,
    textAlign: "left",
    width: "65%",
    [theme.breakpoints.down("lg")]: {
      width: "100%",
      fontSize: 16,
    },
    [theme.breakpoints.down("sm")]: {
      textAlign: "center"
    },

  },
  icon: {
    fontSize: 24
  },
  button: {
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "90%"
    },
  },
  content: {
    height: "45vh",
    [theme.breakpoints.down("sm")]: {
      height: "100%"
    },
  },
  imgMt5: {
    height: 100,
    [theme.breakpoints.down("lg")]: {
      // width: 420,
      height: 80,
    },
  },
  imgNotebook: {
    height: 300,
    [theme.breakpoints.down("lg")]: {
      // width: 420,
      height: 240,
    },
  },
  gridItem: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justify: "center",
      alignItems: "center",
      flexDirection: "column"
    }
  }
}))(Platforms);


