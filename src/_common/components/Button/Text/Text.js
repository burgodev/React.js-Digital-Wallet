import React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Button as MuiButton } from "@material-ui/core";
import PropTypes from "prop-types";

const theme = createTheme({
  overrides: {
    MuiButton: {
      text: {
        fontFamily: "Poppins",
        fontWeight: 500,
        fontSize: 15,
        lineHeight: "125%",
        textTransform: "none",
        "&:hover": {
          background: "transparent",
        },
      },
    },
  },
});

function Text({ children, style, ...props }) {
  return (
    <ThemeProvider theme={theme}>
      <MuiButton style={style} {...props}>
        {children}
      </MuiButton>
    </ThemeProvider>
  );
}

Text.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
  style: PropTypes.object,
};

export default Text;
