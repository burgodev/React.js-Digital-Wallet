import React from "react";
import PropTypes from "prop-types";
import Contained from "./Contained";
import Text from "./Text";
import Icon from "./Icon";
import Outlined from "./Outlined";

PropTypes.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.object,
  variant: PropTypes.oneOf(["contained", "text", "outlined, icon"]),
};

const Button = ({ variant = "contained", children, classes, ...props }) => {
  return (
    <>
      {variant === "contained" && <Contained {...props}>{children}</Contained>}
      {variant === "text" && <Text {...props}>{children}</Text>}
      {variant === "icon" && <Icon {...props}>{children}</Icon>}
      {variant === "outlined" && <Outlined {...props}>{children}</Outlined>}
    </>
  );
};

export default Button;
