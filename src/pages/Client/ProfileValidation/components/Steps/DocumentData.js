import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useHistory } from "react-router";
import s3 from "aws-s3";
import { FileUploader } from "react-drag-drop-files";
import checkIcon from "../../../../../assets/images/checked-simple-outline.gif";
import { FiUploadCloud } from "react-icons/fi";

import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import loginBackground from "../../../../../assets/images/loginBackground.jpg";
import {
  Typography,
  Button,
  Flex,
  Container,
  Card,
  Stepper,
  Divider,
  Loading,
} from "../../../../../_common/components";
import { useSnackbar } from "../../../../../_common/hooks";

import logoSelect from "../../../../../assets/images/select-logo.png";
import api from "../../../../../services/api";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const DOC_TYPES = {
  DOC_FRONT: 0,
  DOC_BACK: 1,
  SELFIE: 2,
  PROOF_RESIDENCE: 3,
};

const DocumentData = ({ classes }) => {
  const [loading, setLoading] = useState({
    docFront: false,
    docBack: false,
    selfie: false,
    proofResidence: false,
    submit: false,
  });

  const [activeStep] = useState(1);
  const history = useHistory();
  const [payload, setPayload] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  // TO DO - Controlar style dos inputs com base no status do documento
  const [statusIdFront /*, setStatusIdFront*/] = useState(0);
  const [statusIdBack /*, setStatusIdBack*/] = useState(0);
  const [statusIdProof /*, setStatusIdProof*/] = useState(0);
  const [statusIdSelfie /*, setStatusIdSelfie*/] = useState(0);
  const user_reference = localStorage.getItem("user_reference");
  // const account_status_id = localStorage.getItem("account_status_id");
  const [fileDocFront, setFileDocFront] = useState(null);
  const [fileDocBack, setFileDocBack] = useState(null);
  const [fileDocProof, setFileDocProof] = useState(null);
  const [fileDocSelfie, setFileDocSelfie] = useState(null);
  const [openSnackbar] = useSnackbar();
  // const [idFront, setIdFront] = useState("");
  // const [idBack, setIdBack] = useState("");
  // const [idProof, setIdProof] = useState("");
  // const [idSelfie, setIdSelfie] = useState("");

  // const getDocumentStatus = async (user_reference) => {
  //   try {
  //     const { data } = await api.get("user/documents/status", {
  //       headers: {
  //         authorization: user_reference,
  //       },
  //     });
  //     setStatusIdFront(data[0].status_id);
  //     setStatusIdBack(data[1].status_id);
  //     setStatusIdProof(data[2].status_id);
  //     setStatusIdSelfie(data[3].status_id);
  //     setIdFront(data[0].id);
  //     setIdBack(data[1].id);
  //     setIdProof(data[2].id);
  //     setIdSelfie(data[3].id);
  //   } catch (error) {}
  // };

  useEffect(() => {
    const getUserInformation = async () => {
      try {
        const { data } = await api.get("/document-type");

        setDocumentTypes(data.payload);
      } catch (error) { }
    };

    getUserInformation();
  }, []);

  const config = useMemo(
    () => ({
      bucketName: "s3-atom-uploads-prd",
      dirName: `uploads/documents/${user_reference}`,
      region: "us-east-1",
      accessKeyId: "AKIATUVX5AKR6GH6SXPJ",
      secretAccessKey: "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",
      s3Url: "https://s3-atom-uploads-prd.s3.us-east-1.amazonaws.com",
    }),
    [user_reference]
  );

  const s3Client = useMemo(() => new s3(config), [config]);
  const today = new Date();
  const date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    "-H" +
    today.getHours() +
    "M" +
    today.getMinutes() +
    "S" +
    today.getSeconds();

  const handleSubmit = async () => {
    try {
      setLoading({ ...loading, submit: true });
      await api.post("/auth/client/documents", {
        email: email,
        documents: payload,
      });
      history.push("/client/accounts/real-account");
    } catch (e) {
      openSnackbar(e.response.data.message, "error")
      setLoading({ ...loading, submit: false });
    }
  };

  const handleUploadDocumentFront = useCallback(
    async (fileDocFront) => {
      try {
        setLoading({ ...loading, docFront: true });
        const newFileName = `${date}-doc-front`;
        setFileDocFront(fileDocFront);

        const result = await s3Client.uploadFile(fileDocFront, newFileName);

        setPayload([
          ...payload,
          {
            type: documentTypes[DOC_TYPES.DOC_FRONT].id,
            url: result.location,
          },
        ]);
        setLoading({ ...loading, docFront: false });
      } catch (error) {
        console.log(error);
      }
    },
    [loading, date, s3Client, documentTypes, payload]
  );

  const handleUploadDocumentBack = useCallback(
    async (fileDocBack) => {
      try {
        const newFileName = `${date}-doc-back`;
        setFileDocBack(fileDocBack);
        setLoading({ ...loading, docBack: true });

        const result = await s3Client.uploadFile(fileDocBack, newFileName);

        setPayload([
          ...payload,
          {
            type: documentTypes[DOC_TYPES.DOC_BACK].id,
            url: result.location,
          },
        ]);
        setLoading({ ...loading, docBack: false });
      } catch (error) { }
    },
    [date, documentTypes, loading, payload, s3Client]
  );

  const handleUploadDocumentProof = useCallback(
    async (fileDocProof) => {
      try {
        const newFileName = `${date}-doc-proof`;
        setFileDocProof(fileDocProof);
        setLoading({ ...loading, proofResidence: true });

        const result = await s3Client.uploadFile(fileDocProof, newFileName);

        setPayload([
          ...payload,
          {
            type: documentTypes[DOC_TYPES.PROOF_RESIDENCE].id,
            url: result.location,
          },
        ]);
        setLoading({ ...loading, proofResidence: false });
      } catch (error) { }
    },
    [date, documentTypes, loading, payload, s3Client]
  );

  const handleUploadDocumentSelfie = useCallback(
    async (fileDocSelfie) => {
      try {
        const newFileName = `${date}-selfie`;
        setFileDocSelfie(fileDocSelfie);
        setLoading({ ...loading, selfie: true });

        const result = await s3Client.uploadFile(fileDocSelfie, newFileName);

        setPayload([
          ...payload,
          {
            type: documentTypes[DOC_TYPES.SELFIE].id,
            url: result.location,
          },
        ]);
      } catch (error) {
        setLoading({ ...loading, selfie: false });
      }
    },
    [date, documentTypes, loading, payload, s3Client]
  );

  // const checkFiles = async (e) => {
  // const { data } = await api.get("user/documents/status", {
  //   headers: {
  //     authorization: user_reference,
  //   },
  // });
  // if (
  //   data[0].route_img === "" ||
  //   data[1].route_img === "" ||
  //   data[2].route_img === "" ||
  //   data[3].route_img === ""
  // ) {
  //   setSnackMessageError("Você precisa enviar as imagens que faltam");
  //   setOpenSnackError(true);
  // } else {
  //   const data = {
  //     user_reference: user_reference,
  //     account_status_id: 2,
  //   };
  //   try {
  //     setLoading(true);
  //     api.put("user/accountstatus/update", data);
  //     history.push("/profile/validation/review");
  //   } catch (error) {
  //     setSnackMessageError("Erro no servidor");
  //     setOpenSnackError(true);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  // };

  // useEffect(() => {
  //   getDocumentStatus(user_reference);
  //   handleUploadDocumentFront();
  //   handleUploadDocumentBack();
  //   handleUploadDocumentProof();
  //   handleUploadDocumentSelfie();
  // }, [
  //   account_status_id,
  //   handleUploadDocumentBack,
  //   handleUploadDocumentFront,
  //   handleUploadDocumentProof,
  //   handleUploadDocumentSelfie,
  //   user_reference,
  // ]);

  return (
    <Container className={classes.container}>
      <Flex center>
        <img src={logoSelect} alt="Logo" className={classes.logoSelect} />
      </Flex>
      <Flex center style={{ marginTop: 32 }}>
        <Stepper steps={STEPS} activeStep={activeStep} width="60%" />
      </Flex>
      <Card className={classes.card}>
        <Flex className={classes.flex}>
          <Flex
            className={
              statusIdFront === 4 ||
                statusIdBack === 4 ||
                statusIdProof === 4 ||
                statusIdSelfie === 4
                ? classes.boxAlertDocuments
                : classes.displayNone
            }
            flexDirection="column"
          >
            <Typography textAlign="center" fontSize="0.9rem">
              Os seguintes documentos foram recusados e ainda não foram
              enviados. Por favor verifique:
            </Typography>
          </Flex>

          <form>
            <Flex
              width="100%"
              className={
                statusIdFront === 2 || statusIdFront === 3
                  ? classes.displayNone
                  : classes.uploadContainer
              }
            >
              <Typography className={classes.titleDocuments}>
                Document front
              </Typography>

              <FileUploader
                hoverTitle="Solte o arquivo aqui"
                maxSize={10}
                name="fileDocFront"
                types={fileTypes}
                handleChange={handleUploadDocumentFront}
                children={
                  <Flex center className={classes.uploadField}>
                    {fileDocFront ? (
                      <Typography className={classes.selectedFile}>
                        {`Arquivo carregado com sucesso`}
                        <img
                          src={checkIcon}
                          alt=""
                          className={classes.checkIcon}
                        />
                      </Typography>
                    ) : (
                      <Flex center className={classes.uploadContent}>
                        {loading.docFront ? (
                          <Loading isLoading size={24} />
                        ) : (
                          <>
                            <FiUploadCloud
                              size={27}
                              className={classes.iconUpload}
                            />
                            <Typography className={classes.dragAndDropText}>
                              Arraste um arquivo ou{" "}
                            </Typography>
                            <Typography className={classes.selectFileText}>
                              selecione
                            </Typography>
                            <Typography
                              className={classes.selectFileTextMobile}
                            >
                              ESCOLHER ARQUIVO
                            </Typography>
                          </>
                        )}
                      </Flex>
                    )}
                  </Flex>
                }
              />
            </Flex>
            <Flex
              width="100%"
              className={
                statusIdBack === 2 || statusIdBack === 3
                  ? classes.displayNone
                  : classes.uploadContainer
              }
            >
              <Typography className={classes.titleDocuments}>
                Document back
              </Typography>

              <FileUploader
                hoverTitle="Solte o arquivo aqui"
                maxSize={10}
                name="fileDocBack"
                types={fileTypes}
                handleChange={handleUploadDocumentBack}
                children={
                  <Flex center className={classes.uploadField}>
                    {fileDocBack ? (
                      <Typography className={classes.selectedFile}>
                        {`Arquivo carregado com sucesso`}
                        <img
                          src={checkIcon}
                          alt=""
                          className={classes.checkIcon}
                        />
                      </Typography>
                    ) : (
                      <Flex center className={classes.uploadContent}>
                        {loading.docBack ? (
                          <Loading isLoading size={24} />
                        ) : (
                          <>
                            <FiUploadCloud
                              size={27}
                              className={classes.iconUpload}
                            />
                            <Typography className={classes.dragAndDropText}>
                              Arraste um arquivo ou{" "}
                            </Typography>
                            <Typography className={classes.selectFileText}>
                              selecione
                            </Typography>
                            <Typography
                              className={classes.selectFileTextMobile}
                            >
                              ESCOLHER ARQUIVO
                            </Typography>
                          </>
                        )}
                      </Flex>
                    )}
                  </Flex>
                }
              />
            </Flex>

            <Flex
              width="100%"
              className={
                statusIdProof === 2 || statusIdProof === 3
                  ? classes.displayNone
                  : classes.uploadContainer
              }
            >
              <Typography className={classes.titleDocuments}>
                Proof of residence
              </Typography>

              <FileUploader
                hoverTitle="Solte o arquivo aqui"
                maxSize={10}
                name="fileDocProof"
                types={fileTypes}
                handleChange={handleUploadDocumentProof}
                children={
                  <Flex center className={classes.uploadField}>
                    {fileDocProof ? (
                      <Typography className={classes.selectedFile}>
                        {`Arquivo carregado com sucesso`}
                        <img
                          src={checkIcon}
                          alt=""
                          className={classes.checkIcon}
                        />
                      </Typography>
                    ) : (
                      <Flex center className={classes.uploadContent}>
                        {loading.proofResidence ? (
                          <Loading isLoading size={24} />
                        ) : (
                          <>
                            <FiUploadCloud
                              size={27}
                              className={classes.iconUpload}
                            />
                            <Typography className={classes.dragAndDropText}>
                              Arraste um arquivo ou{" "}
                            </Typography>
                            <Typography className={classes.selectFileText}>
                              selecione
                            </Typography>
                            <Typography
                              className={classes.selectFileTextMobile}
                            >
                              ESCOLHER ARQUIVO
                            </Typography>
                          </>
                        )}
                      </Flex>
                    )}
                  </Flex>
                }
              />
            </Flex>

            <Flex
              width="100%"
              className={
                statusIdSelfie === 2 || statusIdSelfie === 3
                  ? classes.displayNone
                  : classes.uploadContainer
              }
            >
              <Typography className={classes.titleDocuments}>Selfie</Typography>

              <FileUploader
                hoverTitle="Solte o arquivo aqui"
                maxSize={10}
                name="fileDocSelfie"
                types={fileTypes}
                handleChange={handleUploadDocumentSelfie}
                children={
                  <Flex center className={classes.uploadField}>
                    {fileDocSelfie ? (
                      <Typography className={classes.selectedFile}>
                        {`Arquivo carregado com sucesso`}
                        <img
                          src={checkIcon}
                          alt=""
                          className={classes.checkIcon}
                        />
                      </Typography>
                    ) : (
                      <Flex center className={classes.uploadContent}>
                        {loading.selfie ? (
                          <Loading isLoading size={24} />
                        ) : (
                          <>
                            <FiUploadCloud
                              size={27}
                              className={classes.iconUpload}
                            />
                            <Typography className={classes.dragAndDropText}>
                              Arraste um arquivo ou{" "}
                            </Typography>
                            <Typography className={classes.selectFileText}>
                              selecione
                            </Typography>
                            <Typography
                              className={classes.selectFileTextMobile}
                            >
                              ESCOLHER ARQUIVO
                            </Typography>
                          </>
                        )}
                      </Flex>
                    )}
                  </Flex>
                }
              />
            </Flex>

            <Flex justifyContent="center">
              <Button
                onClick={handleSubmit}
                loading={loading.submit}
                disabled={payload.length !== 4}
              >
                Enviar Documentos
              </Button>
            </Flex>
          </form>
        </Flex>
      </Card>
      <Flex flexDirection="column" center style={{ marginTop: 8 }}>
        <Button
          className={classes.button}
          variant="text"
          disabled={loading.submit}
          onClick={() => role === "Client" ? history.push("/client/accounts/real-account") : history.push("/admin/home")}
        >
          Pular esta etapa
        </Button>
        <Divider className={classes.divider} />
      </Flex>
    </Container >
  );
};

const STEPS = [
  {
    id: 1,
    label: "Profile Data",
  },
  {
    id: 2,
    label: "Document upload",
  },
];

export default withStyles((theme) => ({
  displayNone: {
    display: "none",
  },
  boxAlertDocuments: {
    background: "red",
    padding: "10px 25px",
    color: "white",
    borderRadius: "5px",
    marginBottom: "20px",
  },
  container: {
    backgroundImage: `linear-gradient(to right, #eaeaea , rgb(255 255 255 / 0%)),url(${loginBackground})`,
    backgroundSize: "cover",
    backgroundPositionX: "right",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5vh 10vw 10vh",
  },
  card: {
    height: "100%",
    width: "100%",
    maxWidth: "700px",
    backgroundColor: "white",
    borderRadius: "15px",

    flexDirection: "column",
    padding: "24px 0 28px 0",
    boxShadow: "-1px 1px 14px -3px rgba(0,0,0,0.20)",
  },
  logoSelect: {
    width: "150px",
  },

  errorMessageDocument: {
    marginTop: "15px",
  },
  uploadContainer: {
    flexDirection: "column",
    justifyContent: "center",
    margin: "0px 0 20px 0",
  },
  uploadContent: {
    display: "flex",
    cursor: "pointer",
    padding: "0 60px",
    [theme.breakpoints.down("xs")]: {
      padding: "0 20px",
      fontSize: "0.7rem",
    },
  },
  titleDocuments: {
    textAlign: "left",
    fontSize: "22px",
    fontWeight: 600,
    marginBottom: "8px",
    [theme.breakpoints.down("xs")]: {
      textAlign: "left",
    },
  },
  dragAndDropText: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  selectFileTextMobile: {
    display: "none",

    [theme.breakpoints.down("xs")]: {
      display: "unset",
      fontSize: "1rem",
      fontWeight: 600,
      color: theme.palette.main,
    },
  },
  selectFileText: {
    fontSize: "1rem",
    fontWeight: 600,
    color: theme.palette.main,
    marginLeft: "2px",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  uploadField: {
    height: "70px",
    border: `1px dashed ${theme.palette.main}`,
    borderRadius: "5px",
  },
  iconUpload: {
    color: theme.palette.main,
    marginRight: "5px",
  },
  selectedFile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "0.9rem",
    fontWeight: 600,
    color: theme.palette.main,
  },
  checkIcon: {
    width: "40px",
    marginLeft: "15px",
  },
  divider: {
    width: 65,
    height: 6,
    background: "#5FB6AB",
    color: "#5FB6AB",
    borderRadius: 209,
    opacity: 1,
    border: "none",
  },
  flex: {
    flexDirection: "column",
    padding: "0 50px",
    [theme.breakpoints.down("sm")]: {
      padding: "0 24px",
    },
  }
}))(DocumentData);

DocumentData.propTypes = {
  classes: PropTypes.object,
};
