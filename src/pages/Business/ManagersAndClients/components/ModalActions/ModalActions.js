import React, { useState } from "react";
import PropTypes from "prop-types";
import { DialogTitle, withStyles } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Formik, Form } from "formik";

import selectLogo from "../../../../../assets/images/select-logo.png";
import { Flex, Card, Button } from "../../../../../_common/components";
import {
  Welcome,
  ChangeLevel,
  ChangeManager,
  Success
} from "./components";
import { useSnackbar } from "../../../../../_common/hooks"

const STEPS = {
  EVALUATE: 0,
  CHANGE_LEVEL: 1,
  CHANGE_MANAGER: 2,
  SUCCESS: 3,
}

const ACTIONS = {
  EVALUATE: 0,
  CHANGE_LEVEL: 1,
  CHANGE_MANAGER: 2,
}


const ModalActions = ({ classes, onClose, action }) => {
  const [step, setStep] = useState(action);
  const [openSnackbar] = useSnackbar();

  const closeModal = () => {    
    onClose();
  }

  const handleSubmit = () => {
    try {
      let url = "";
      switch (action) {
        default: {
          url = "endpoint/evaluate"
          break;
        }
        case ACTIONS.CHANGE_LEVEL: {
          url = "endpoint/changelevel"
          break;
        }
        case ACTIONS.CHANGE_MANAGER: {
          url = "endpoint/changelevel"
          break;
        }
      }

      console.log("url", url)

      // const { data } = await api.post(url, values )      
      nextStep()
    } catch (e) {
      onClose();
      openSnackbar(e.response.data.message, "error")
    }
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={(values) => validate(values, action)}
    >
      {(formik) => (
        <Form>
          <Card className={classes.card}>
            <DialogTitle disableTypography className={classes.title}>
              <Flex justifyContent="flex-end" width="100%">
                <Button
                  variant="icon"
                  onClick={closeModal}
                  className={classes.iconButton}
                >
                  <CloseIcon />
                </Button>
              </Flex>
              <Flex center width="100%">
                <img
                  src={selectLogo}
                  alt="selectLogo"
                  className={classes.selectLogo}
                />
              </Flex>
            </DialogTitle>

            {step === STEPS.EVALUATE && (
              <Welcome nextStep={nextStep} />
            )}
            {step === STEPS.CHANGE_LEVEL && (
              <ChangeLevel nextStep={nextStep} submit={action.CHANGE_LEVEL ? true : false} />
            )}
            {step === STEPS.CHANGE_MANAGER && (
              <ChangeManager />
            )}
            {step === STEPS.SUCCESS && (
              <Success nextStep={nextStep} />
            )}
          </Card>
        </Form>
      )}
    </Formik>
  );
};


ModalActions.propTypes = {
  classes: PropTypes.object,
  action: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};


const initialValues = {
  level: "",
  manager: "",
};

const validate = (values, action) => {
  const errors = {};

  if (action !== ACTIONS.CHANGE_MANAGER && !values.level) {
    errors.level = "Campo obrigatório *";
    return errors;
  }
  if (!values.manager) {
    errors.manager = "Campo obrigatório *";
    return errors;
  }

  return errors;
};

export default withStyles((theme) => ({
  title: {
    padding: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    flexDirection: "column",
  },
  card: {
    boxShadow: "10px 10px 50px rgba(0, 0, 0, 0.5)",
    padding: "24px 32px 24px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: 540,
  },
  iconButton: {
    color: "#5fb6ab",
    borderRadius: "50%",
    padding: 0,
  },
  selectLogo: {
    width: "40%",
  },
}))(ModalActions);
