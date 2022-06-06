import React, { useState } from "react";
import { Navigation, Container } from "../../../_common/components";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import ChangePassword from "./ChangePassword";
import Documents from "./Documents/Documents";
import MyProfile from "./MyProfile";
import { useTranslation } from "react-i18next";

const Profile = ({ classes }) => {
  const i18n = useTranslation().t;
  const [selected, setSelected] = useState(1);

  const navList = [
    {
      id: 0,
      text: i18n("profile.changePassword"),
      link: "/client/profile",
    },
    {
      id: 1,
      text: i18n("profile.myProfile"),
      link: "/client/profile",
    },
    {
      id: 2,
      text: i18n("profile.myDocuments"),
      link: "/client/profile",
    },
  ];

  const callback = (id) => {
    setSelected(id);
  };

  return (
    <Container className={classes.container}>
      <Navigation navList={navList} callback={callback} initialValue={1} />

      {selected === 0 && <ChangePassword />}
      {selected === 1 && <MyProfile />}
      {selected === 2 && <Documents />}
    </Container>
  );
}

Profile.propTypes = {
  classes: PropTypes.object,
};

export default withStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "space-between",
  },
}))(Profile);
