import React, { useState, useEffect, useCallback } from "react";
import { Typography, Flex, Button } from "../../../../../_common/components";
import {useSnackbar} from "../../../../../_common/hooks"
import {
  withStyles,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { FiRotateCcw, FiRotateCw } from "react-icons/fi";
import selectAvisoDocumento from "../../../../../assets/images/select-aviso-documento.jpg";
import api from "../../../../../services/api";
import Carousel from "react-material-ui-carousel";


const Documents = ({ classes }) => {
  const [rotation, setRotation] = useState(0);
  const email = localStorage.getItem("email");
  const user_reference = localStorage.getItem("admin_user_reference");
  const [documentData, setDocumentData] = useState([]);
  const [sliderDocument, setSliderDocument] = useState(0);
  const [documentApproveId, setDocumentApproveId] = useState(0);
  const [documentRefuseId, setDocumentRefuseId] = useState(0);
  const [commentRefuse, setCommentRefuse] = useState("");
  const [openDialogRefuse, setOpenDialogRefuse] = useState(false);
  const [documentType, setDocumentType] = useState("");
  const [openSnackbar] = useSnackbar();

  const approveDocument = useCallback(async() => {
    const data = {
      email: email,
      document_id: documentApproveId,
      user_id:user_reference
    };
    try {
        await api.post("admin/document/approve", data)
        openSnackbar("Document sucessfully approved", "success")
        setSliderDocument(sliderDocument + 1);
        if (sliderDocument === 3) {
          setSliderDocument(sliderDocument - 3);
        }
    } catch(error){
          alert("Error, please refresh.");
      };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentApproveId, email,sliderDocument,user_reference]);

  useEffect(() => {
    getDocumentData(user_reference);
    if (documentApproveId !== 0) {
      approveDocument(documentApproveId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentApproveId]);

  const handleOpenDialogRefuse = () => {
    setOpenDialogRefuse(true);
  };

  const handleCloseDialogRefuse = () => {
    setOpenDialogRefuse(false);
  };

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


  const getDocumentData = useCallback(async (user_reference) => {
    try {
      const response = await api.post("admin/user/documents", {user_id:user_reference});
    
      setDocumentData(response.data.payload[0].document);
    
    } catch (error) {}
  },[]);

  const refuseDocument = () => {
    const data = {
      email: email,
      document_id: documentRefuseId,
      description: commentRefuse,
      user_reference: user_reference,
    };

    api
      .post("admin/document/reprove", data)
      .then((res) => {
        setOpenDialogRefuse(false);
        openSnackbar("Rejected document", "error")
        setSliderDocument(sliderDocument + 1);
      })
      .catch((error) => {
        if (error) {
          alert("Error, please refresh." + user_reference);
        }
      });
  };

  return (
    <Flex width="75%" center className={classes.documentImagesContainer}>
  
      <Dialog
        open={openDialogRefuse}
        onClose={handleCloseDialogRefuse}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{documentType}</DialogTitle>
        <DialogContent>\
          <DialogContentText>
            Você está recusando o documento de um usuário, por favor digite o
            motivo abaixo:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Motivo"
            type="text"
            fullWidth
            value={commentRefuse}
            onChange={(e) => setCommentRefuse(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.btDialog}
            onClick={handleCloseDialogRefuse}
            color="primary"
          >
            Fechar
          </Button>
          <Button
            style={{ background: "#ea3b3b" }}
            className={classes.btDialog}
            onClick={refuseDocument}
            color="primary"
          >
            Recusar
          </Button>
        </DialogActions>
      </Dialog>
      <Carousel
        className={classes.carouselImages}
        navButtonsAlwaysVisible={true}
        autoPlay={false}
        index={sliderDocument}
        indicators={false}
        
      >
        {documentData.map((document) => (
          <>
            <Flex
              width="40%"
              alignItems="center"
              justifyContent="space-between"
              className={classes.documentTypeContainer}
              key={document.updated_at}
            >
              <Typography
                fontWeight={600}
                color="white"
                textAlign="center"
                width="100%"
              >
                {document.document_type.name}
              </Typography>
            </Flex>
            <Flex
              width="22%"
              justifyContent="space-between"
              center
              className={
                document.document_status === 'WAITING_UPLOAD' ||
                document.document_status === 'DENIED' ||
                document.document_status === 'APPROVED'
                  ? classes.displayNone
                  : classes.documentRotationContainer
              }
            >
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
            </Flex>
            <img
              key={document.id}
              src={
                document.document_status === 'DENIED' ||
                document.document_status === 'WAITING_UPLOAD'
                  ? selectAvisoDocumento
                  : document.route_url
              }
              alt=""
              className={classes.documentImage}
              style={{
                transform: `rotate(${rotation}deg)`,
              }}
            />

            <Flex
              alignItems="center"
              justifyContent="space-between"
              className={
                document.document_status === 'WAITING_UPLOAD' ||
                document.document_status === 'DENIED' ||
                document.document_status === 'APPROVED'
                  ? classes.displayNone
                  : classes.btValidationContainer
              }
              width="95%"
            >
              <Button
                className={classes.btValidation}
                style={{
                  background: "#2CDA00",
                }}
                onClick={() => setDocumentApproveId(document.id)}
              >
                Aprovar
              </Button>
              <Button
                className={classes.btValidation}
                style={{ background: "#ea3b3b" }}
                onClick={() => {
                  setDocumentRefuseId(document.id);
                  setDocumentType(document.document_type.id);
                  handleOpenDialogRefuse();
                }}
              >
                Recusar
              </Button>
            </Flex>
          </>
        ))}
      </Carousel>
    </Flex>
  );
};

export default withStyles((theme) => ({
  displayNone: {
    display: "none",
  },
  documentImagesContainer: {
    height: "95%",
    [theme.breakpoints.only("lg")]: {
      width: "95% !important",
    },
    [theme.breakpoints.down("md")]: {},
  },
  documentImage: {
    objectFit: "contain",
    height: "100%",
    width: "100%",
    borderRadius: "10px",
  },
  documentTypeContainer: {
    position: "absolute",
    zIndex: "100",
    top: "5px",
    left: "5px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    height: "40px",
    borderRadius: "8px",
    padding: "0 15px",
  },
  documentRotationContainer: {
    position: "absolute",
    zIndex: "100",
    top: "5px",
    right: "5px",
    backgroundColor: "black",
    height: "40px",
    borderRadius: "8px",
    padding: "0 15px",
  },
  iconRotateDocumentImage: {
    color: "white",
    cursor: "pointer",
  },
  btValidationContainer: {
    position: "absolute",
    zIndex: "100",
    bottom: "10px",
    left: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    height: "60px",
    borderRadius: "8px",
    padding: "0 15px",
  },
  btValidation: {
    height: "35px",
    width: "45% !important",
  },
  btDialog: {
    width: "150px !important",
    height: "42px",
    margin: "15px 15px 15px 0",
  },
  carouselImages: {
    display: "flex",
    position: "relative",
    zIndex: "10",
    height: "100%",
    alignItems: "center",
    borderRadius: "10px",
    "&:": {
      height: "100%",
    },
    [theme.breakpoints.only("lg")]: {
      width: "100% !important",
      height: "100% !important",
    },
    [theme.breakpoints.down("md")]: {},
  },
}))(Documents);

Documents.propTypes = {
  classes: PropTypes.object,
  activeStep1: PropTypes.number,
};
