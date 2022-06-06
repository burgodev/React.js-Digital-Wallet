import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { Divider, Modal } from "@material-ui/core";

import Typography from "../../../_common/components/Typography";
import Flex from "../../../_common/components/Flex";
import Button from "../../../_common/components/Button";
import { theme } from "../../../_common/utils/theme";
import NavHeaderConfig from "../../../components/Admin/NavHeaderConfig";
import adminMasterIcon from "../../../assets/images/admin-master-icon.svg";
import adminBossIcon from "../../../assets/images/admin-boss-icon.svg";
import adminSupIcon from "../../../assets/images/admin-sup-icon.svg";

function NewUserConfig({ classes }) {
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
          <Flex
            className={classes.modalContainer}
            center={true}
            width="30%"
            flexDirection="column"
          >
            <Typography className={classes.titleModal} textAlign="left">
              Novo usuário
            </Typography>
            <Typography textAlign="left" fontWeight={500}>
              Tipo de usuário:
            </Typography>
            <img
              src={adminMasterIcon}
              alt=""
              className={classes.modalIconUserType}
            />
            <Divider className={classes.dividerModal} />
            <Typography
              className={classes.titleModal}
              textAlign="left"
              fontSize="1.4rem"
            >
              Dados do usuário
            </Typography>
            <Flex className={classes.inputGroupContainer}>
              <Flex flexDirection="column">
                <Typography textAlign="left">Nome</Typography>
                <input className={classes.modalInput} />
              </Flex>
              <Flex flexDirection="column">
                <Typography textAlign="left">Sobrenome</Typography>
                <input className={classes.modalInput} />
              </Flex>
            </Flex>
            <Flex className={classes.inputGroupContainer}>
              <Flex flexDirection="column">
                <Typography textAlign="left">CPF</Typography>
                <input className={classes.modalInput} />
              </Flex>
              <Flex flexDirection="column">
                <Typography textAlign="left">Data de nascimento</Typography>
                <input type="date" className={classes.modalInput} />
              </Flex>
            </Flex>
            <Flex className={classes.inputGroupContainer}>
              <Flex flexDirection="column">
                <Typography textAlign="left">Telefone</Typography>
                <input className={classes.modalInput} />
              </Flex>
              <Flex flexDirection="column">
                <Typography textAlign="left">Email</Typography>
                <input
                  autoComplete="off"
                  type="email"
                  className={classes.modalInput}
                />
              </Flex>
            </Flex>
            <Flex className={classes.inputGroupContainer}>
              <Flex flexDirection="column">
                <Typography textAlign="left">Senha de acesso</Typography>
                <input
                  autoComplete="off"
                  type="password"
                  className={classes.modalInput}
                />
              </Flex>
            </Flex>
            <Button className={classes.btCreateUserOnModal}>
              Criar usuário
            </Button>
          </Flex>
        </form>
      </Modal>
      <NavHeaderConfig />
      <Flex flexDirection="column" style={{ margin: "0 0 0 30px" }}>
        <Typography textAlign="left" className={classes.titlePage}>
          Cadastre um novo usuário
        </Typography>
        <Typography textAlign="left" fontSize="1.2rem">
          Selecione o cargo para o novo usuário
        </Typography>
        <Flex style={{ margin: "25px 0 0 0" }}>
          <Flex
            width="300px"
            flexDirection="column"
            style={{ margin: "0 20px 0 0" }}
          >
            <Flex center={true} className={classes.btUserType}>
              <img
                src={adminBossIcon}
                alt=""
                className={classes.iconUserType}
              />
            </Flex>
            <Typography className={classes.userTypeDescription}>
              CEO ou CFO da empresa
            </Typography>
          </Flex>
          <Flex
            width="300px"
            flexDirection="column"
            style={{ margin: "0 20px 0 0" }}
          >
            <Flex center={true} className={classes.btUserType}>
              <img
                src={adminMasterIcon}
                alt=""
                className={classes.iconUserType}
              />
            </Flex>
            <Typography className={classes.userTypeDescription}>
              Para heads financeiros e administrativos
            </Typography>
          </Flex>
          <Flex
            width="300px"
            flexDirection="column"
            style={{ margin: "0 20px 0 0" }}
          >
            <Flex center={true} className={classes.btUserType}>
              <img src={adminSupIcon} alt="" className={classes.iconUserType} />
            </Flex>
            <Typography className={classes.userTypeDescription}>
              Responsável para gerenciar e dar o suporte para clientes com
              dúvidas ou necessidades especificas.
            </Typography>
          </Flex>
        </Flex>
        <Button onClick={handleOpen} className={classes.btCreateUser}>
          Criar novo usuário
        </Button>
      </Flex>
    </Flex>
  );
}

export default withStyles((theme) => ({
  titlePage: {
    fontWeight: 700,
    fontSize: "1.8rem",
    color: theme.colors.text,
    margin: "0 0 50px 0",
  },
  iconUserType: {
    width: "130px",
  },
  btUserType: {
    background: "white",
    height: "80px",
    borderRadius: "15px",
    padding: "20px",
    margin: "0 20px 0 0",
  },
  userTypeDescription: {
    margin: "10px 0 0 0",
    color: "gray",
    fontWeight: 400,
    fontSize: "0.8rem",
  },
  btCreateUser: {
    margin: "50px 0 0 0",
    width: "300px",
    textTransform: "unset",
  },
  modalContainer: {
    position: "relative",
    background: "white",
    height: "630px",
    margin: "10% auto",
    padding: "50px",
    borderRadius: "27px",
  },
  titleModal: {
    fontWeight: 600,
    fontSize: "1.7rem",
    color: theme.colors.text,
    margin: "0 0 35px 0",
  },
  modalIconUserType: {
    width: "100px",
    margin: "10px 0 0 0",
  },
  dividerModal: {
    margin: "15px 0 25px 0",
    width: "100%",
  },
  inputGroupContainer: {
    margin: "0 0 15px 0",
  },
  modalInput: {
    height: "30px",
    width: "225px",
    border: "1px solid #B2D4E4",
    borderRadius: "5px",
    padding: "10px",
    margin: "3px 0 0 0",
  },
  btCreateUserOnModal: {
    textTransform: "unset",
    width: "50%",
    margin: "25px 0 0 0",
  },
}))(NewUserConfig);

NewUserConfig.propTypes = {
  classes: PropTypes.object,
};
