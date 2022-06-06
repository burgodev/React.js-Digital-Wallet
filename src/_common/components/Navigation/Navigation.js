import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

import { Flex, Button, Divider, Container } from "../";

PropTypes.propTypes = {
  classes: PropTypes.object,
  navList: PropTypes.array.isRequired,
  callback: PropTypes.func,
  initialValue: PropTypes.number,
};

const Navigation = ({ classes, callback = (x) => x, navList, initialValue = 0 }) => {
  const [selected, setSelected] = useState(initialValue);

  const handleNavigation = (id) => {
    setSelected(id);
    callback(id);
  };
  return (
    <Container clean className={classes.container}>
      <Flex alignItems="center" justifyContent="space-around">
        {navList.map(({ text, id, link }) => (
          <Link to={link} className={classes.link} key={id}>
            <Button
              variant="text"
              className={
                selected === id ? classes.selectedButton : classes.button
              }
              onClick={() => handleNavigation(id)}
            >
              {text}
            </Button>
            <Divider
              className={
                selected === id
                  ? classes.buttonDecoration
                  : classes.selectedButtonDecoration
              }
            />
          </Link>
        ))}
      </Flex>
      <Divider className={classes.divider} />
    </Container>
  );
};

export default withStyles((theme) => ({
  buttonDecoration: {
    width: "100%",
    height: "6px",
    border: "none",
    borderRadius: "209px",
    background: "#5FB6AB",
    opacity: 1,
    transition: "250ms",
  },
  selectedButtonDecoration: {
    width: "50%",
    height: "6px",
    border: "none",
    borderRadius: "209px",
    background: "#5FB6AB",
    opacity: 1,
    transition: "250ms",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  divider: {
    marginTop: 24,
  },
  button: {
    transition: "250ms",
    [theme.breakpoints.only("lg")]: {
      fontSize: 14,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 10,
    },
  },
  selectedButton: {
    fontWeight: "600",
    fontSize: 22,
    transition: "250ms",
    [theme.breakpoints.only("lg")]: {
      fontSize: 18,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
  },
  link: {
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}))(Navigation);
