import React from "react";
import clsx from "clsx";
import Check from "@material-ui/icons/Check";

import {
  withStyles,
  makeStyles,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Fade,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { theme } from "../../../_common/utils/theme";

const ProfileValidation = ({ classes, activeStep1 }) => {
  const QontoConnector = withStyles({
    MuiStepper: {
      root: {
        background: "transparent !important",
      },
    },
    MuiPaper: {
      root: {
        background: "transparent !important",
      },
    },
    alternativeLabel: {
      top: 10,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
    },
    active: {
      "& $line": {
        borderColor: theme.colors.primary,
      },
    },
    completed: {
      "& $line": {
        borderColor: theme.colors.primary,
      },
    },
    line: {
      borderColor: "#eaeaf0",
      borderTopWidth: 3,
      borderRadius: 1,
    },
  })(StepConnector);

  const labelStepper = [
    {
      id: 1,
      name: "Profile Data",
    },
    {
      id: 2,
      name: "Document upload",
    },
    {
      id: 3,
      name: "Resume information",
    },
  ];
  const useQontoStepIconStyles = makeStyles({
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
      color: theme.colors.primary,
    },
    circle: {
      width: 22,
      height: 22,
      borderRadius: "50%",
      backgroundColor: theme.colors.primary,
    },
    completed: {
      color: theme.colors.primary,
      zIndex: 1,
      fontSize: 30,
    },
  });

  function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
        })}
      >
        {completed ? (
          <Check className={classes.completed} />
        ) : (
          <div className={classes.circle} />
        )}
      </div>
    );
  }

  return (
    <>
      <Fade in={true} timeout={1000}>
        <Stepper
          activeStep={activeStep1}
          alternativeLabel
          connector={<QontoConnector />}
        >
          {labelStepper.map((label) => (
            <Step key={label.id}>
              <StepLabel StepIconComponent={QontoStepIcon}>
                {label.name}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Fade>
    </>
  );
};
export default withStyles((theme) => ({}))(ProfileValidation);

ProfileValidation.propTypes = {
  classes: PropTypes.object,
  activeStep1: PropTypes.number,
};
