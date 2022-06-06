import React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Button as MuiButton } from "@material-ui/core";
import PropTypes from "prop-types";
import { theme as mainTheme } from "../../../utils/theme.js";

const theme = createTheme({
  overrides: {
    MuiButton: {
      text: {
        width: 280,
        height: 52,
        border: `1px solid ${mainTheme.palette.main}`,
        background: "transparent",
        textTransform: "none",
        // boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: 16,
        color: mainTheme.palette.main,
        fontFamily: "Poppins",
        fontWeight: 600,
        fontSize: "1rem",
        lineHeight: "104.5%",
        "&:hover": {
          // backgroundColor: "white",
          // color: "#398CBF",
        },
      },
    },
  },
});

PropTypes.propTypes = {
  children: PropTypes.object,
};

function Contained({ children, ...props }) {
  return (
    <ThemeProvider theme={theme}>
      <MuiButton {...props}>{children}</MuiButton>
    </ThemeProvider>
  );
}

export default Contained;
