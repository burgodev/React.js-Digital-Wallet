import React from "react";
import { useHistory } from "react-router";
import Modal from "@material-ui/core/Modal";

import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { Typography, Button, Flex } from "../../../../../_common/components";
import successConfetti from "../../../../../assets/images/success-conffeti.gif";
import api from "../../../../../services/api";

const ModalAccountApproved = ({ classes, openModal }) => {
  const history = useHistory();
  const user_reference = localStorage.getItem("user_reference");

  const changeAccountStatus = async () => {
    try {
      const res = await api.put("user/accountstatus/update", {
        user_reference: user_reference,
        account_status_id: 4,
      });
      if (res.status === 200) {
        history.push("/profile/dashboard");
      }
    } catch (err) {}
  };
  return (
    <>
      <Modal open={openModal}>
        <Flex
          flexDirection="column"
          width="480px"
          className={classes.modalSuccessAccount}
        >
          <img
            className={classes.modalImageSuccess}
            src={successConfetti}
            alt="sucess"
          />
          <Flex alignItems="center" flexDirection="column">
            <Typography className={classes.textCongratulations}>
              Parabéns!
            </Typography>
            <Typography className={classes.textApproved}>
              Seu cadastro foi aprovado
            </Typography>
            <Typography className={classes.textAdvise}>
              Agora você pode acessar os recursos da plataforma e começar a
              operar
            </Typography>
          </Flex>
          <Button onClick={changeAccountStatus} className={classes.btAcess}>
            Acessar
          </Button>
        </Flex>
      </Modal>
    </>
  );
};
export default withStyles((theme) => ({
  modalSuccessAccount: {
    alignItems: "center",
    height: "550px",
    margin: "10% auto",
    background: "white",
    borderRadius: "15px",
    padding: "50px",
  },
  modalImageSuccess: {
    width: "160px",
  },
  textCongratulations: {
    fontWeight: 700,
    fontSize: "2.2rem",
    color: theme.colors.text,
    marginTop: "45px",
  },
  textApproved: {
    fontWeight: 700,
    fontSize: "1.5rem",
    color: theme.colors.primary,
    margin: "30px 0 45px 0",
  },
  textAdvise: {
    fontSize: "1rem",
    color: theme.colors.text,
    marginBottom: "40px",
    width: "90%",
  },
  btAcess: {
    width: "75%",
  },
}))(ModalAccountApproved);

ModalAccountApproved.propTypes = {
  classes: PropTypes.object,
  openModal: PropTypes.bool,
};
