import React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import PropTypes from "prop-types";

const theme = createTheme({
  overrides: {
    MuiButton: {
      text: {
        transition: ".5s",
        "&:hover": {
          transform: "scale(1.25)",
        },
      },
    },
  },
});

PropTypes.propTypes = {
  children: PropTypes.object,
};

const Icon = ({ children, ...props }) => {
  return (
    <ThemeProvider theme={theme}>
      <IconButton {...props}>{children}</IconButton>
    </ThemeProvider>
  );
};

export default Icon;
