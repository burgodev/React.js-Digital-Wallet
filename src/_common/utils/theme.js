import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
      },
    },
    MuiStepper: {
      // Nome da regra
      root: {
        // Algum CSS
        background: "transparent",
        paddingTop: 0,
      },
    },
  },

  typography: {
    fontFamily: "Poppins",
  },

  palette: {
    primary: {
      light: "#A1C3ED",
      main: "#5FB6AB",
      dark: "#286090",
      contrastText: "#FFFFFF",
    },

    yellow: "#FFA900",
    white: "#FFF",
    red: "#FF5251",

    purple: "#9746FF",
    green: "#69BF41",
    main: "#5FB6AB",
    secondary: {
      main: "#151A30",
    },
  },

  colors: {
    primary: "#398CBF",
    secondary: "#6FACCF",
    text: "#373839",
    bgGlobalGradient:
      "linear-gradient(196deg, rgba(57, 140, 191, 0.7) 0%, rgba(105,191,167,0.1) 100%)",
    bgGlobalGradientMobile:
      "linear-gradient(196deg, rgba(57, 140, 191, 0.5) 0%, rgba(105,191,167,0.1) 100%)",
    mainMenuBg: "#B2D4E4",
    globalBgColor: "#EDEDED",
    topMenuBgColor: "#E5E5E5",
    logoBlueColor: "#00B7FF",
    textPurple: "#4439BF",
    btPurple: "#4439BF",
    lightGray: "#e7e7e7",
  },

  animations: {
    animateToLeft: {
      animation: `$animateToLeft 5s`,
      keyframeName: "@keyframes animateToLeft",
      keyframeValue: {
        from: {
          right: -500,
        },
        to: {
          right: 0,
        },
      },
    },
    fadeIn: {
      animation: `$fadeIn 1s`,
      keyframeName: "@keyframes fadeIn",
      keyframeValue: {
        "0%": {
          opacity: 0,
        },
        "100%": {
          opacity: 1,
        },
      },
    },
  },

  space: {
    globalPadding: "0px 30px 0px 30px",
    unit: 8,
    padding: "0px 30px 0px 30px",
    margin: 8,
  },

  MuiButton: {
    // Name of the rule
    text: {
      // Some CSS
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 48,
      padding: "0 30px",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
  },
});
