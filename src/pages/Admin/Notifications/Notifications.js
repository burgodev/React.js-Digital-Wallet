import React, { useState } from "react";
import PropTypes from "prop-types";

import { Typography, Flex, Button, Card } from "../../../_common/components";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core";
import selectLogoTest from "../../../assets/images/select-logo.png";
import { FiSettings, FiUpload, FiXCircle } from "react-icons/fi";

const Notifications = ({ classes }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Flex flexDirection="column">
      <Modal open={open} onClose={handleClose}>
        <form>
          <Flex width="25%" flexDirection="column" className={classes.modalNotificationsContainer}>
            <FiXCircle
              size={21}
              color="#6FACCF"
              onClick={handleClose}
              className={classes.iconCloseModal}
            />
            <Typography className={classes.modalTitle}>Criar notificação</Typography>
            <Flex flexDirection="column" className={classes.modalInputFieldContainer}>
              <Typography textAlign="left">Titulo da notificação</Typography>
              <input></input>
            </Flex>
            <Flex flexDirection="column" className={classes.modalInputFieldContainer}>
              <Typography textAlign="left">Usuários</Typography>
              <select>
                <option>Selecione uma opção</option>
              </select>
            </Flex>
            <Flex flexDirection="column" className={classes.modalInputFieldContainer}>
              <Typography textAlign="left">Descrição</Typography>
              <input></input>
            </Flex>
            <Flex flexDirection="column" style={{ margin: "10px 0 0 0" }}>
              <Typography textAlign="left">Imagem</Typography>
              <Flex alignItems="center" className={classes.modalUploadField}>

                <label>
                  <input
                    type="file"
                    accept="image/*"
                  />
                  <FiUpload
                    size={30}
                    color="#91CDF2"
                  />

                </label>
                <Typography textAlign="left" color="#91CDF2" margin="0 0 0 10px">Escolher arquivo</Typography>
              </Flex>
            </Flex>
            <Flex justifyContent="center">
              <Button style={{ textTransform: "unset", marginTop: "25px" }}>Criar notificação</Button>
            </Flex>
          </Flex>
        </form>
      </Modal>
      <Typography textAlign="left" className={classes.titlePageNotifications}>
        Notificações
      </Typography>
      <Button onClick={handleOpen} style={{ textTransform: "unset", marginBottom: "55px" }}>
        Nova notificação
      </Button>
      <Typography textAlign="left" fontWeight={600} fontSize="1.4rem">
        Recentes
      </Typography>
      <Flex>
        <Card width="700px" className={classes.mainCardNotification}>
          <Flex flexDirection="column">
            <Typography fontWeight={600} fontSize="1.1rem" textAlign="left">
              Aviso clientes
            </Typography>
            <Typography className={classes.notificationTitle}>
              Titulo da notificação
            </Typography>
            <Typography
              className={classes.btUpdateNotification}
            >
              {" "}
              <FiSettings style={{ marginRight: "5px" }} />
              Alterar notificação
            </Typography>
          </Flex>
          <Flex className={classes.notificationImageContainer}>
            <img
              src={selectLogoTest}
              alt=""
              className={classes.documentImage}
            />
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
}

export default withStyles((theme) => ({
  modalNotificationsContainer: {
    position: "relative",
    background: "white",
    height: "520px",
    margin: "10% auto",
    borderRadius: "10px",
    padding: "55px 35px 45px 35px",
  },
  iconCloseModal: {
    position: "absolute",
    right: "25px",
    top: "25px",
    cursor: "pointer",
  },
  modalInputFieldContainer: {
    "& input": {
      padding: "0 0 0 8px",
      height: "40px",
      border: "1px solid #B2D4E4",
      boxSizing: "border-box",
      borderRadius: "5px",
      fontSize: "1rem",
      margin: "0 0 10px 0"
    },
    "& span": {
      textAlign: "left",
      margin: "10px 0 2px 0",
    },
    "& select": {
      padding: "0 0 0 8px",
      height: "40px",
      border: "1px solid #B2D4E4",
      boxSizing: "border-box",
      borderRadius: "5px",
      fontSize: "1rem",
      color: "gray",
      margin: "0 0 10px 0"
    }
  },
  modalUploadField: {
    "& input[type=file]": {
      position: "absolute",
      top: "-1000px",
    },
    margin: "5px 0 0 0",
    padding: "7px 0 3px 10px",
    borderRadius: "5px",
    border: "1px solid #B2D4E4"
  },
  modalTitle: {
    textAlign: "center",
    width: "100%",
    fontWeight: 700,
    fontSize: "1.5rem",
    color: theme.colors.text,
    margin: "0 0 25px 0"
  },
  titlePageNotifications: {
    fontWeight: 700,
    fontSize: "2rem",
    color: theme.colors.text,
    margin: "0 0 50px 0",
  },
  mainCardNotification: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "25px",
    background: "white",
    height: "450px",
    borderRadius: "25px",
    padding: "35px",
  },
  btUpdateNotification: {
    fontWeight: 600,
    color: theme.colors.primary,
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  notificationTitle: {
    fontWeight: 500,
    lineHeight: "35px",
    fontSize: "2rem",
    textAlign: "left",
    margin: "20px 0",
  },
  notificationImageContainer: {
    padding: "20px",
    width: "250px",
    background: "unset",
    borderRadius: "5px",
    border: "1px solid gray",
  },
  documentImage: {
    objectFit: "contain",
    height: "100%",
    width: "100%",
  },
}))(Notifications);

Notifications.propTypes = {
  classes: PropTypes.object,
};
