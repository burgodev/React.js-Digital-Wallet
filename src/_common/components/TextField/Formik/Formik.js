import React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { TextField as MuiTextfield } from "@material-ui/core";
import PropTypes from "prop-types";

import { theme } from "../../../utils/theme";

PropTypes.propTypes = {
  children: PropTypes.object,
  style: PropTypes.object,
  formik: PropTypes.object,
  background: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  borderRadius: PropTypes.string,
  name: PropTypes.string,
};

const Outlined = ({
  children,
  background,
  formik,
  name,
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
        notchedOutline: {},
        root: {},
      },
      MuiFormControl: {
        root: {},
      },

      MuiFormLabel: {
        root: {},
      },
      MuiInputBase: {
        root: {},
      },
      MuiMenuItem: {
        root: {},
      },
      MuiPaper: {
        root: {}
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
      <MuiTextfield
        variant="outlined"
        name={name}
        InputLabelProps={{ shrink: true }}
        fullWidth
        size="small"

        value={formik.values[name]}
        onChange={formik.handleChange}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
        {...props}
      >
        {children}
      </MuiTextfield>
    </ThemeProvider>
  );
};

export default Outlined;
