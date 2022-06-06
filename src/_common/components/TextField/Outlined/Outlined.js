import React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { TextField as MuiTextfield } from "@material-ui/core";
import PropTypes from "prop-types";

import { theme } from "../../../utils/theme";

PropTypes.propTypes = {
  children: PropTypes.object,
  style: PropTypes.object,
  background: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.string,
};

const Outlined = ({
  children,
  background,
  color = theme.palette.primary.main,
  // color = "#05C7F2",
  // width,
  // height,
  // borderRadius,
  // fontSize,
  ...props
}) => {
  const theme = createTheme({
    overrides: {
      MuiOutlinedInput: {
        notchedOutline: {
          // border: "none",
          // border: "1px solid #05C7F2",
          // "&:hover": {
          //   color: "red",
          //   border: "1px solid red",
          // },
        },
        root: {
          //   "&:hover": {
          // color: "red",
          // border: "1px solid red",
          // borderRadius: 50,
          //   },
        },
      },
      MuiFormControl: {
        root: {
          color: "red",
          border: 0,
          margin: 0,
          display: "inline-flex",
          padding: 0,
          position: "relative",
          minWidth: 0,
          flexDirection: "column",
          verticalAlign: "top",

          // height: height,
          // width: width,
          // borderRadius: "29px",
          // "&:focus": {},
          // "&:hover": {
          //   color: "red",
          //   border: "1px solid red",
          // },
        },
      },

      MuiFormLabel: {
        root: {
          padding: 0,
          fontSize: "1.1428571428571428rem",
          // fontFamily: "Nunito",
          fontWeight: 400,
          lineHeight: 1,
        },
      },
      MuiInputBase: {
        root: {
          // height: height,
          // width: width,

          color: "#727272",
          cursor: "text",
          display: "inline-flex",
          position: "relative",
          fontSize: "1.1428571428571428rem",
          background: "white",
          boxSizing: "border-box",
          alignItems: "center",
          // fontFamily: "Nunito",
          fontWeight: 400,
          lineHeight: "1.1876em",
          // "&:hover": {
          //   color: "red",
          //   border: "1px solid red",
          // },
        },
      },
      MuiMenuItem: {
        root: {
          // width: "auto",
          // overflow: "hidden",
          // fontSize: "1.1428571428571428rem",
          // boxSizing: "border-box",
          // minHeight: 48,
          // fontFamily: "Nunito",
          // fontWeight: 400,
          // lineHeight: 1.5,
          // paddingTop: 6,
          // color: "#727272",
          // whiteSpace: "nowrap",
          // letterSpacing: "0.00938em",
          // paddingBottom: 6,
        },
      },
      MuiPaper: {
        // root: "#727272",
      },
    },

    palette: {
      primary: {
        main: color,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <MuiTextfield variant="outlined" {...props}>
        {children}
      </MuiTextfield>
    </ThemeProvider>
  );
};

export default Outlined;
