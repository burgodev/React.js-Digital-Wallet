import React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { TextField as MuiTextfield } from "@material-ui/core";
import PropTypes from "prop-types";

PropTypes.propTypes = { children: PropTypes.object };

const Standard = ({ children, ...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <MuiTextfield
        {...props}
        variant="filled"
        InputProps={{
          disableUnderline: true, // <== added this
        }}
      >
        {children}
      </MuiTextfield>
    </ThemeProvider>
  );
};

const theme = createTheme({
  // overrides: {
  //   MuiInputBase: {
  //     root: {
  //       borderRadius: "8px !important",
  //       height: 39,        
  //     },
  //   },
  //   MuiFilledInput: {
  //     input: {
  //       padding: 16,
  //     },
  //   },
  //   MuiFormControl: {
  //     root: {
  //       background: "#DCDCDC",
  //     },
  //   },
  // },
});

export default Standard;
