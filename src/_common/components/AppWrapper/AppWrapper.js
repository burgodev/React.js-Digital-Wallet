import React, { useState } from "react";
import PropTypes from "prop-types";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles, Fab, Dialog } from "@material-ui/core";

import Sidebar from "../../../_common/components/Sidebar";
import { Header, Container } from "../"
import { theme } from "../../utils/theme";


const AppWrapper = ({ classes, children }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container className={classes.container}>
      {mobile ?
        <>
          <Fab onClick={() => setOpenMenu(true)} aria-label="edit" className={classes.fab}>
            <MenuIcon fontSize="large" />
          </Fab>
          <Dialog
            maxWidth="sm"
            open={openMenu}
            onClose={() => setOpenMenu(false)}
          >
            <Sidebar onClose={() => setOpenMenu(false)} />
          </Dialog>
        </>
        :
        <>
          <Sidebar />
          <Header />
        </>
      }


      <div className={classes.content}>
        {children}
      </div>

    </Container>
  );
}

AppWrapper.propTypes = {
  children: PropTypes.array,
  classes: PropTypes.object,
};

export default withStyles((theme) => ({
  container: {
    width: "100vw",
    height: "100vh",
    background: theme.palette.white,
  },
  content: {
    height: "90vh",
    // height: "calc(100vh - 120px)",
    width: "calc(100vw - 325px)",
    display: "flex",
    flexDirection: "column",
    background: "white",
    padding: "0 2vw 4vh",
    position: "fixed",
    overflow: "auto",
    bottom: 0,
    right: 0,
    marginBottom: 16,
    [theme.breakpoints.down("lg")]: {
      height: "88vh",
      width: "calc(100vw - 280px)",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0 2vw 2vh",
      minHeight: "88vh",
      width: "100vw",
      overflowX: "auto",
    },
  },
  fab: {
    margin: "8px",
    position: "fixed",
    top: 0,
    zIndex: 1,
    background: theme.palette.main,
    color: theme.palette.white
  },
}))(AppWrapper);
