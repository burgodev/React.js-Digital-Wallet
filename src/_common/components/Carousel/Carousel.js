import React, { useState, useEffect } from "react";
import { withStyles, Fade } from "@material-ui/core";
import PropTypes from "prop-types";
import Skeleton from '@material-ui/lab/Skeleton';
import {
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

import { theme } from "../../utils/theme";
import { Flex, Container, Card } from "../";

const Carousel = ({ classes, children, length, itemWidth = 300, loading, ...props }) => {
  const [scrollX, setScrollX] = useState(0);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const listWidth = (length + 1) * itemWidth;

  useEffect(() => {
    if (listWidth < window.innerWidth) {
      setShowRightArrow(false)
    } else {
      setShowRightArrow(true)
    }
  }, [listWidth])

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (scrollX === 0)
      setShowLeftArrow(false)
    if (x > 0) {
      x = 0;
    }
    setShowRightArrow(true)
    setScrollX(x);
  };

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    setShowLeftArrow(true)
    if (window.innerWidth - listWidth > x) {
      setShowRightArrow(false)
      x = window.innerWidth - listWidth - 60; //60 se refere ao padding total entre as flechas da ponta direita e equerda + espaço entre os itens
    } else {
      setShowRightArrow(true)
    }
    setScrollX(x);
  };

  if (loading) return (
    <Flex justifyContent="space-between" style={{ marginTop: 24 }}>
      <Skeleton variant="rect" width={364} height={364} />
      <Skeleton variant="rect" width={364} height={364} />
      <Skeleton variant="rect" width={364} height={364} />
      <Skeleton variant="rect" width={364} height={364} />
    </Flex>
  )

  return (
    <Fade in={true} timeout={500}>
      <Container className={`${classes.container}`} {...props}>
        <Flex
          width="unset"
          height="100%"
          className={`${!showLeftArrow
            ? `${classes.displayNone}`
            : `${classes.accArrow} ${classes.accArrowLeft}`
            }`}
          onClick={handleLeftArrow}
        >
          <FiChevronsLeft
            className={classes.icon}
            color={theme.colors.primary}
          />
        </Flex>
        <Flex
          height="100%"
          width="unset"
          className={`${!showRightArrow
            ? `${classes.displayNone}`
            : `${classes.accArrow} ${classes.accArrowRight}`
            }`}
          onClick={handleRightArrow}
        >
          <FiChevronsRight
            className={classes.icon}
            color={theme.colors.primary}
          />
        </Flex>

        <Card className={classes.cardListArea}>
          <Flex
            className={classes.cardList}
            width={`${Number(length) * Number(itemWidth)}px`}
            style={{ marginLeft: scrollX }}
          >
            {children}
          </Flex>
        </Card>
      </Container>
    </Fade>
  );
}

Carousel.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.array,
  length: PropTypes.number.isRequired,
  itemWidth: PropTypes.number,
};

export default withStyles((theme) => ({
  container: {
    transition: 500,
    position: "relative",
    height: "auto",
    opacity: 1,
  },
  displayNone: {
    display: "none",
  },
  accArrow: {
    position: "absolute",
    height: "100%",
    zIndex: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  accArrowRight: {
    right: "0px",
  },
  accArrowLeft: {
    left: "-30px",
  },
  cardListArea: {
    display: "inline-block",
    overflowX: "hidden",
    width: "100%"
  },
  cardList: {
    borderRadius: "15px",
    padding: "25px 0px",
    transition: "all ease 0.8s",
  },
  icon: {
    fontSize: 50
  },
  loading: {
    marginTop: 16
  }
}))(Carousel);


