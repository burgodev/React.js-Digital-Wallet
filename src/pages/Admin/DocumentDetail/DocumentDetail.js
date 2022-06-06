import React, { useState } from "react";
import Typography from "../../../_common/components/Typography";
import Flex from "../../../_common/components/Flex";
import Button from "../../../_common/components/Button";

import { Divider, withStyles } from "@material-ui/core";

import PropTypes from "prop-types";
import { theme } from "../../../_common/utils/theme";

import {
  FiUpload,
  FiCheck,
  FiRotateCcw,
  FiRotateCw,
  FiChevronsLeft,
  FiChevronsRight,
  FiUser,
} from "react-icons/fi";
import selectLogoTest from "../../../assets/images/select-logo.png";

function DocumentDetail({ classes }) {
  const [rotation, setRotation] = useState(0);

  const documentImageRotateRight = (e) => {
    let newRotation = rotation + 90;
    if (newRotation >= 360) {
      newRotation = -360;
    }
    setRotation(newRotation);
  };
  const documentImageRotateLeft = (e) => {
    let newRotation = rotation - 90;
    if (newRotation >= 360) {
      newRotation = -360;
    }
    setRotation(newRotation);
  };

  return (
    <Flex flexDirection="column" style={{ margin: "15px 0 0 15px" }}>
      <Typography
        textAlign="left"
        className={classes.titleDocumentDetail}
        width="25%"
      >
        Dados do usuário
      </Typography>
      <Flex style={{ height: "100vh" }}>
        <Flex width="35%" flexDirection="column">
          <Flex className={classes.inputGroupContainer}>
            <Flex flexDirection="column">
              <Typography textAlign="left">Nome</Typography>
              <input className={classes.inputField} />
            </Flex>
            <Flex flexDirection="column">
              <Typography textAlign="left">Sobrenome</Typography>
              <input className={classes.inputField} />
            </Flex>
          </Flex>
          <Flex className={classes.inputGroupContainer}>
            <Flex flexDirection="column">
              <Typography textAlign="left">Número do documento</Typography>
              <input className={classes.inputField} />
            </Flex>
            <Flex flexDirection="column">
              <Typography textAlign="left">Data de nascimento</Typography>
              <input className={classes.inputField} />
            </Flex>
          </Flex>
          <Flex className={classes.inputGroupContainer}>
            <Flex flexDirection="column">
              <Typography textAlign="left">País</Typography>
              <input className={classes.inputField} />
            </Flex>
            <Flex flexDirection="column">
              <Typography textAlign="left">Estado</Typography>
              <input className={classes.inputField} />
            </Flex>
          </Flex>
          <Flex className={classes.inputGroupContainer}>
            <Flex flexDirection="column">
              <Typography textAlign="left">Cidade</Typography>
              <input className={classes.inputField} />
            </Flex>
            <Flex flexDirection="column">
              <Typography textAlign="left">Endereço</Typography>
              <input className={classes.inputField} />
            </Flex>
          </Flex>
          <Flex className={classes.inputGroupContainer}>
            <Flex flexDirection="column">
              <Typography textAlign="left">CEP</Typography>
              <input className={classes.inputField} />
            </Flex>
            <Flex flexDirection="column">
              <Typography textAlign="left">Complemento</Typography>
              <input className={classes.inputField} />
            </Flex>
          </Flex>
          <Flex className={classes.inputGroupContainer}>
            <Flex flexDirection="column">
              <Typography textAlign="left">Código do país</Typography>
              <input className={classes.inputField} />
            </Flex>
            <Flex flexDirection="column">
              <Typography textAlign="left">Telefone</Typography>
              <input className={classes.inputField} />
            </Flex>
          </Flex>
          <Flex
            flexDirection="column"
            width="85%"
            alignItems="center"
            className={classes.uploadFields}
          >          
            
              <Flex alignItems="center" style={{ marginTop: "30px"}} className={classes.statusDocumentContainer}>                  
                <Typography width="100%" textAlign="left">ID Frente</Typography>            
                <FiCheck size={40} color="#69BF41" />
                <Typography className={classes.iconUser}>
                  <FiUser size={20} color="white"/>
                </Typography>  
                <Typography>Usuário</Typography>              
              </Flex>           
              <Flex alignItems="center" className={classes.statusDocumentContainer}>  
                <Typography width="100%" textAlign="left">ID Verso</Typography>            
                <FiCheck size={40} color="#69BF41" />
                <Typography className={classes.iconUser}>
                  <FiUser size={20} color="white"/>
                </Typography>   
                <Typography>Usuário</Typography>             
              </Flex>    
              <Flex alignItems="center" className={classes.statusDocumentContainer}>  
                <Typography width="100%" textAlign="left">Comprovante residencia</Typography>            
                <FiCheck size={40} color="#69BF41" />
                <Typography className={classes.iconUser}>
                  <FiUser size={20} color="white"/>                  
                </Typography>                
                <Typography>Usuário</Typography>
              </Flex>
            
              <Flex alignItems="center" className={classes.statusDocumentContainer}>  
                <Typography width="100%" textAlign="left">Selfie</Typography>            
                <FiCheck size={40} color="#69BF41" />
                <Typography className={classes.iconUser}>
                  <FiUser size={20} color="white"/>
                </Typography>   
                <Typography>Usuário</Typography>             
              </Flex>
          </Flex>
        </Flex>
        <Divider
          orientation="vertical"
          height="100%"
          style={{ margin: "0 15px" }}
        />
        <Flex width="45%" flexDirection="column" alignItems="center">
          <Flex width="500px" className={classes.documentImageContainer}>
            <img
              src={selectLogoTest}
              alt=""
              className={classes.documentImage}
              style={{
                transform: `rotate(${rotation}deg)`,
              }}
            />
          </Flex>
          <Flex
            flexDirection="column"
            alignItems="center"
            style={{ marginTop: "15px" }}
          >
            <Flex center={true}>
              <FiChevronsLeft
                className={classes.iconRotateDocumentImage}
                size={30}
              />
              <FiRotateCcw
                onClick={documentImageRotateLeft}
                className={classes.iconRotateDocumentImage}
                size={25}
              />
              <FiRotateCw
                onClick={documentImageRotateRight}
                className={classes.iconRotateDocumentImage}
                size={25}
              />
              <FiChevronsRight
                className={classes.iconRotateDocumentImage}
                size={30}
              />
            </Flex>
            <Flex
              center={true}
              style={{ marginTop: "15px" }}
              justifyContent="space-between"
              width="35%"
            >
              <Button
                style={{ background: "#E02020" }}
                className={classes.btChangeStatusDocument}
              >
                Reprovar
              </Button>
              <Button
                style={{ background: "#2CDA00" }}
                className={classes.btChangeStatusDocument}
              >
                Aprovar
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
export default withStyles((theme) => ({
  titleDocumentDetail: {
    fontWeight: 700,
    fontSize: "2rem",
    color: theme.colors.text,
    margin: "0 0 50px 0",
  },
  inputGroupContainer: {
    margin: "0 0 15px 0",
  },
  inputField: {
    height: "30px",
    width: "200px",
    border: "1px solid #B2D4E4",
    borderRadius: "5px",
    padding: "10px",
    margin: "3px 0 0 0",
  },
  uploadFields: {
    "& input[type=file]": {
      position: "absolute",
      top: "-1000px",
    },
  },
  labelUploadFile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",      
    cursor: "pointer",    
  },
  iconUser: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 10px",
    background: theme.colors.textPurple,
    borderRadius: "50%",
    padding: "7px"
  },
  statusDocumentContainer: {
    margin: "0 0 15px 0", 
    borderBottom: "1px solid #d9d9d9"
  },
  documentImageContainer: {
    padding: "20px",
    height: "600px",
    background: "white",
    borderRadius: "15px",
  },
  documentImage: {
    objectFit: "contain",
    height: "100%",
    width: "100%",
  },
  btChangeStatusDocument: {
    borderRadius: "20px",
    height: "30px",
    width: "120px",
    fontSize: "1rem",
    textTransform: "unset",
  },
  iconRotateDocumentImage: {
    color: theme.colors.primary,
    margin: "0 10px",
  },
}))(DocumentDetail);

DocumentDetail.propTypes = {
  classes: PropTypes.object,
};
