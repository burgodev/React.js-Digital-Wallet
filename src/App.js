import React from "react";
import "./global.css";
import Routes from "./routes";
import CssBaseline from "@material-ui/core/CssBaseline";
import { theme } from "./_common/utils/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import SnackbarProvider from 'react-simple-snackbar'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <CssBaseline />
        <Routes />
      </SnackbarProvider>
    </ThemeProvider>

  );
}

export default App;
