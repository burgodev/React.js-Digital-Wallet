import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Stepper as MuiStepper,
  StepLabel,
  Step,
  StepConnector,
  makeStyles,
} from "@material-ui/core";
import clsx from "clsx";
import AndroidIcon from "@material-ui/icons/Android";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

import ShareIcon from "@material-ui/icons/Share";
import CheckIcon from "@material-ui/icons/Check";
import { theme } from "../../utils/theme";

PropTypes.propTypes = {
  classes: PropTypes.object,
  steps: PropTypes.array.isRequired,
  activeStep: PropTypes.number.isRequired,
  width: PropTypes.oneOfType[(PropTypes.number, PropTypes.string)],
  color: PropTypes.oneOfType[(PropTypes.number, PropTypes.string)],
};

const Stepper = ({
  classes,
  width,
  steps = [],
  activeStep,
  color = theme.palette.primary.main,
}) => {
  function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
      1: <ShareIcon />,
      2: <AndroidIcon />,
      3: <AccountBalanceIcon />,
      4: <AttachMoneyIcon />,
      5: <CheckIcon />,
    };

    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }
  const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: "#ccc",
      zIndex: 1,
      color: "#fff",
      width: 50,
      height: 50,
      display: "flex",
      borderRadius: "50%",
      justifyContent: "center",
      alignItems: "center",
    },
    active: {
      backgroundImage: `linear-gradient(151.49deg, #032557 0%,${color} 50%, ${color})`,
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    },
    completed: {
      backgroundImage: `linear-gradient(151.49deg, #032557 0%,${color} 50%, ${color})`,
    },
  });

  const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      "& $line": {
        backgroundImage: `linear-gradient(151.49deg, #032557 0%,${color} 50%, ${color})`,
      },
    },
    completed: {
      "& $line": {
        backgroundImage: `linear-gradient(151.49deg, #032557 0%,${color} 50%, ${color})`,
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: "#eaeaf0",
      borderRadius: 1,
    },
  })(StepConnector);

  return (
    <MuiStepper
      alternativeLabel
      activeStep={activeStep}
      connector={<ColorlibConnector />}
      style={{ width }}
    >
      {steps.map(({ id, label }) => (
        <Step key={id}>
          <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </MuiStepper>
  );
};

export default withStyles((theme) => ({}))(Stepper);
