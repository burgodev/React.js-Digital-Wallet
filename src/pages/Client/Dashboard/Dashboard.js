import React from "react";
import { withStyles, Grid } from "@material-ui/core";
import PropTypes from "prop-types";

import { Navigation } from "../../../_common/components";

const navList = [
  {
    id: 0,
    text: "Dashboard",
    link: "/client/dashboard",
  },
];

const Dashboard = ({ classes }) => {
  return (

    <Grid container className={classes.container} justifyContent="flex-end" spacing={2}>
      <Grid item xs={12} style={{ textAlign: 'center', }}>
        <Navigation navList={navList} />
      </Grid>
    </Grid>

  );
}

export default withStyles((theme) => ({}))(Dashboard);

Dashboard.propTypes = {
  classes: PropTypes.object,
};

