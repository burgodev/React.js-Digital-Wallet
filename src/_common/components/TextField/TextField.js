import React from "react";
import PropTypes from "prop-types";
// import Standard from "./Standard";
import Outlined from "./Outlined";
// import Filled from "./Filled";
import Formik from "./Formik";
// import { TextField as MuiTextfield } from "@material-ui/core";

PropTypes.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.object,
  children: PropTypes.object,
  formik: PropTypes.object,
  variant: PropTypes.oneOf(["standard", "outlined", "filled, formik"]),
};

const TextField = ({
  variant = "outlined",
  formik,
  className,
  children,
  classes,
  ...props
}) => {
  return formik ? (
    <Formik
      children={children}
      className={className}
      formik={formik}
      {...props}
    />
  ) : (
    variant === "outlined" && (
      <Outlined children={children} className={className} {...props} />
    )
  );
};

export default TextField;
