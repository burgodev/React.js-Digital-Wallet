import React from "react";
import { withStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import {
  Container,
  Card,
  Typography,
  Button,
} from "../../../_common/components";

import loginBackground from "../../../assets/images/loginBackground.jpg";

const MOCKUP = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras euismod est quis varius finibus. Maecenas laoreet magna augue, vel scelerisque ex auctor at. Donec dapibus malesuada ligula id rutrum. Maecenas vitae ex interdum, auctor velit imperdiet, semper nunc. Quisque scelerisque ante ac libero placerat ultricies. Aliquam ullamcorper nec enim nec porttitor. Fusce ultrices, mauris sed vulputate rhoncus, leo risus cursus arcu, sed egestas tortor est ac elit. Aliquam lacus erat, porttitor et venenatis a, fringilla a felis. Suspendisse diam lectus, tempus quis ullamcorper ac, hendrerit sit amet lorem. Suspendisse ante purus, viverra eget tristique ut, suscipit ut mauris. Mauris fermentum nunc vel lacus elementum, eu efficitur metus vulputate. Quisque commodo, sem eu volutpat varius, massa ex commodo erat, vitae feugiat quam mauris non nunc. In eget quam id velit convallis fermentum a ac ante. Mauris orci tellus, varius vitae nisl vitae, volutpat vehicula sapien. Cras finibus imperdiet accumsan. In volutpat finibus neque, vehicula blandit justo mattis et. Aliquam erat volutpat. Morbi pellentesque porttitor tempus. Vivamus a ullamcorper lectus. Aliquam sagittis, arcu ut imperdiet aliquam, felis turpis aliquet risus, quis mattis leo erat in risus. Nam purus lorem, bibendum at est quis, consequat sagittis lectus. Sed rutrum nisi felis, in placerat quam tempor sit amet. Phasellus fermentum vel nisi non iaculis. Aenean laoreet volutpat pharetra. Nunc euismod lacinia aliquam. Ut tempus ipsum id lectus viverra ultricies. Mauris lacinia lorem et ex egestas ornare. Duis vel lectus est. Donec in dolor in tellus pretium pretium sed sit amet ipsum. Ut vitae turpis elementum, egestas ipsum vel, vestibulum risus. Etiam at imperdiet orci. Morbi at tincidunt libero, rhoncus laoreet nulla. Morbi pharetra at arcu eu aliquam. Donec ac dignissim dui, sed pretium urna. Quisque at sollicitudin sapien. Ut dignissim magna quis felis maximus elementum. Aenean rhoncus ante mauris, at sollicitudin purus hendrerit ut. Quisque tempor dui facilisis, sodales neque quis, tristique sapien. Proin vitae nisi id libero faucibus scelerisque et eget lectus. Maecenas non quam arcu. Curabitur pretium, mi viverra hendrerit cursus, arcu enim porta sapien, id fringilla ipsum felis eget nibh. Fusce euismod risus ut odio auctor, tincidunt semper ligula malesuada.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras euismod est quis varius finibus. Maecenas laoreet magna augue, vel scelerisque ex auctor at. Donec dapibus malesuada ligula id rutrum. Maecenas vitae ex interdum, auctor velit imperdiet, semper nunc. Quisque scelerisque ante ac libero placerat ultricies. Aliquam ullamcorper nec enim nec porttitor. Fusce ultrices, mauris sed vulputate rhoncus, leo risus cursus arcu, sed egestas tortor est ac elit. Aliquam lacus erat, porttitor et venenatis a, fringilla a felis. Suspendisse diam lectus, tempus quis ullamcorper ac, hendrerit sit amet lorem. Suspendisse ante purus, viverra eget tristique ut, suscipit ut mauris. Mauris fermentum nunc vel lacus elementum, eu efficitur metus vulputate. Quisque commodo, sem eu volutpat varius, massa ex commodo erat, vitae feugiat quam mauris non nunc. In eget quam id velit convallis fermentum a ac ante. Mauris orci tellus, varius vitae nisl vitae, volutpat vehicula sapien. Cras finibus imperdiet accumsan. In volutpat finibus neque, vehicula blandit justo mattis et. Aliquam erat volutpat. Morbi pellentesque porttitor tempus. Vivamus a ullamcorper lectus. Aliquam sagittis, arcu ut imperdiet aliquam, felis turpis aliquet risus, quis mattis leo erat in risus. Nam purus lorem, bibendum at est quis, consequat sagittis lectus. Sed rutrum nisi felis, in placerat quam tempor sit amet. Phasellus fermentum vel nisi non iaculis. Aenean laoreet volutpat pharetra. Nunc euismod lacinia aliquam. Ut tempus ipsum id lectus viverra ultricies. Mauris lacinia lorem et ex egestas ornare. Duis vel lectus est. Donec in dolor in tellus pretium pretium sed sit amet ipsum. Ut vitae turpis elementum, egestas ipsum vel, vestibulum risus. Etiam at imperdiet orci. Morbi at tincidunt libero, rhoncus laoreet nulla. Morbi pharetra at arcu eu aliquam. Donec ac dignissim dui, sed pretium urna. Quisque at sollicitudin sapien. Ut dignissim magna quis felis maximus elementum. Aenean rhoncus ante mauris, at sollicitudin purus hendrerit ut. Quisque tempor dui facilisis, sodales neque quis, tristique sapien. Proin vitae nisi id libero faucibus scelerisque et eget lectus. Maecenas non quam arcu. Curabitur pretium, mi viverra hendrerit cursus, arcu enim porta sapien, id fringilla ipsum felis eget nibh. Fusce euismod risus ut odio auctor, tincidunt semper ligula malesuada.",
];

function TermsOfUse({ classes }) {
  const history = useHistory();
  const i18n = useTranslation().t;
  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <Typography
          element="p"
          // textAlign="center"
          fontSize={32}
          fontWeight={600}
        >
          {i18n("termsOfUse.title")}
        </Typography>
        <Typography element="p" style={{ padding: 32, textAlign: "start" }}>
          {MOCKUP[0]}
          {MOCKUP[1]}
        </Typography>
        <Button
          onClick={() => history.push("/register")}
          className={classes.button}
        >
          {i18n("termsOfUse.back")}
        </Button>
      </Card>
    </Container>
  );
}
export default withStyles((theme) => ({
  container: {
    height: "100vh",
    width: "100vw",
    backgroundImage: `linear-gradient(to right, #eaeaea , rgb(255 255 255 / 0%)),url(${loginBackground})`,
    backgroundSize: "contain",
    backgroundPositionX: "right",
    display: "flex",

    justifyContent: "center",
    overflow: "auto",
  },
  card: {
    boxShadow: "10px 10px 50px rgba(0, 0, 0, 0.75)",
    padding: "64px 64px 32px",
    display: "flex",
    flexDirection: "column",
    height: "fit-content",
    justifyContent: "space-between",
    background: "white",
    alignItems: "center",
    margin: "64px 0 32px",
    width: "50%",
    borderRadius: 20,
    [theme.breakpoints.only("xs")]: {
      width: "90%",
      padding: "16px 0",
    },
  },
  button: {
    marginTop: 32,
    width: "50%",
  },
}))(TermsOfUse);

TermsOfUse.propTypes = {
  classes: PropTypes.object,
};
