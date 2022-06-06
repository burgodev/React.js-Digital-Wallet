import React, { useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import s3 from "aws-s3";
import { FileUploader as Uploader } from "react-drag-drop-files";
import { FiUploadCloud } from "react-icons/fi";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import ErrorIcon from "@material-ui/icons/Error";
import CheckIcon from "@material-ui/icons/Check";

import { Typography, Flex, Loading } from "../../../_common/components";
import { theme } from "../../../_common/utils/theme";

const FileUploader = ({
  classes,
  docStatus,
  docType,
  callback,
  docName
}) => {
  const i18n = useTranslation().t;
  const [loading, setLoading] = useState(false);
  // const user_reference = localStorage.getItem("user_reference");
  const [file, setFile] = useState(null);

  const config = useMemo(
    () => ({
      bucketName: "s3-atom-uploads-prd",
      dirName: `uploads/documents/null`,
      region: "us-east-1",
      accessKeyId: "AKIATUVX5AKR6GH6SXPJ",
      secretAccessKey: "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",
      s3Url: "https://s3-atom-uploads-prd.s3.us-east-1.amazonaws.com",
    }), []);

  const s3Client = useMemo(() => new s3(config), [config]);



  const handleChange = useCallback(
    async (file) => {
      try {
        setLoading(true);
        const newFileName = `${date}-${docName}`;
        const { location } = await s3Client.uploadFile(file, newFileName);
        setFile(file);
        callback({
          type: docType,
          url: location,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    },
    [s3Client, callback, docType, docName]
  );

  switch (docStatus) {
    case DOC_STATUS.WAITING_UPLOAD: {
      return (
        <Uploader
          name="file"
          types={fileTypes}
          handleChange={handleChange}
          children={
            <Flex
              center
              className={file ? classes.uploadSuccess : classes.waitingUpload}
            >
              {file ? (
                <Typography className={classes.selectedFile}>
                  {i18n("fileUploader.fileSuccess")}
                  <CheckIcon
                    color="inherit"
                    fontSize="large"
                    className={classes.checkIcon}
                  />
                </Typography>
              ) : (
                <Flex center className={classes.uploadContent}>
                  {loading ? (
                    <Loading isLoading size={24} color="inherit" />
                  ) : (
                    <>
                      <FiUploadCloud size={27} className={classes.iconUpload} />
                      <Typography className={classes.dragAndDropText}>
                        {i18n("fileUploader.drag")}{" "}
                        {i18n("fileUploader.select")}
                      </Typography>
                    </>
                  )}
                </Flex>
              )}
            </Flex>
          }
        />
      );
    }

    case DOC_STATUS.WAITING_VALIDATION: {
      return (
        <Uploader
          name="file"
          types={fileTypes}
          handleChange={handleChange}
          children={
            <Flex
              center
              className={
                file ? classes.uploadSuccess : classes.waitingValidation
              }
            >
              {file ? (
                <Typography className={classes.selectedFile}>
                  {i18n("fileUploader.fileSuccess")}
                  <CheckIcon
                    color="inherit"
                    fontSize="large"
                    className={classes.checkIcon}
                  />
                </Typography>
              ) : (
                <>
                  {loading ? (
                    <Loading isLoading size={24} color="inherit" />
                  ) : (
                    <>
                      <HourglassEmptyIcon color="inherit" />

                      <Typography
                        className={classes.dragAndDropText}
                        color={theme.palette.warning.main}
                      >
                        {i18n("fileUploader.analysis")}
                      </Typography>
                    </>
                  )}
                </>
              )}
            </Flex>
          }
        />
      );
    }

    case DOC_STATUS.DENIED: {
      return (
        <Uploader
          name="file"
          types={fileTypes}
          handleChange={handleChange}
          children={
            <Flex
              center
              className={file ? classes.uploadSuccess : classes.denied}
            >
              {file ? (
                <Typography className={classes.selectedFile}>
                  {i18n("fileUploader.fileSuccess")}
                  <CheckIcon
                    color="inherit"
                    fontSize="large"
                    className={classes.checkIcon}
                  />
                </Typography>
              ) : (
                <>
                  {loading ? (
                    <Loading isLoading size={24} color="inherit" />
                  ) : (
                    <>
                      <ErrorIcon color="inherit" />

                      <Typography
                        className={classes.dragAndDropText}
                        style={{ marginRight: 4 }}
                        color={theme.palette.error.main}
                      >
                        {i18n("fileUploader.reproved")}
                      </Typography>
                    </>
                  )}
                </>
              )}
            </Flex>
          }
        />
      );
    }

    case DOC_STATUS.APPROVED: {
      return (
        <Uploader
          name="file"
          types={fileTypes}
          handleChange={handleChange}
          children={
            <>
              <Flex
                center
                className={file ? classes.uploadSuccess : classes.approved}
              >
                {file ? (
                  <Typography className={classes.selectedFile}>
                    {i18n("fileUploader.fileSuccess")}
                    <CheckIcon
                      color="inherit"
                      fontSize="large"
                      className={classes.checkIcon}
                    />
                  </Typography>
                ) : (
                  <>
                    {loading ? (
                      <Loading isLoading size={24} color="inherit" />
                    ) : (
                      <>
                        <CheckIcon color="inherit" />
                        <Typography
                          className={classes.dragAndDropText}
                          color={theme.palette.success.main}
                        >
                          {i18n("fileUploader.file")} <strong>{i18n("fileUploader.approved")}</strong>
                        </Typography>
                      </>
                    )}
                  </>
                )}
              </Flex>
              <Flex center style={{ marginTop: 8 }}>
                <Typography>
                  {i18n("fileUploader.approvedHint")}
                </Typography>
              </Flex>
            </>
          }
        />
      );
    }

    default:
      return (
        <Uploader
          name="file"
          types={fileTypes}
          handleChange={handleChange}
          children={
            <Flex
              center
              className={file ? classes.uploadSuccess : classes.waitingUpload}
            >
              {file ? (
                <Typography className={classes.selectedFile}>
                  {i18n("fileUploader.fileSuccess")}
                  <CheckIcon
                    color="inherit"
                    fontSize="large"
                    className={classes.checkIcon}
                  />
                </Typography>
              ) : (
                <Flex center className={classes.uploadContent}>
                  {loading ? (
                    <Loading isLoading size={24} color="inherit" />
                  ) : (
                    <>
                      <FiUploadCloud size={27} className={classes.iconUpload} />
                      <Typography className={classes.dragAndDropText}>
                        {i18n("fileUploader.drag")}{" "}
                        {i18n("fileUploader.select")}
                      </Typography>
                    </>
                  )}
                </Flex>
              )}
            </Flex>
          }
        />
      );
  }
};

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

const DOC_STATUS = {
  WAITING_UPLOAD: "WAITING_UPLOAD",
  WAITING_VALIDATION: "WAITING_VALIDATION",
  DENIED: "DENIED",
  APPROVED: "APPROVED",
};

FileUploader.propTypes = {
  classes: PropTypes.object,
  callback: PropTypes.func.isRequired,
  docType: PropTypes.string.isRequired,
  docStatus: PropTypes.string.isRequired
};

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

export default withStyles((theme) => ({
  waitingUpload: {
    height: "7.5vh",
    width: "80%",
    border: `1px dashed black`,
    borderRadius: "5px",
    cursor: "pointer",
    transform: "scale(0.95)",
    transition: "0.25s",
    "&:hover": {
      transform: "scale(1)",
    },
    [theme.breakpoints.down("lg")]: {
      height: "6vh",
    },
  },
  waitingValidation: {
    height: "7.5vh",
    width: "80%",
    border: `1px solid ${theme.palette.warning.main}`,
    color: theme.palette.warning.main,
    borderRadius: "5px",
    cursor: "wait",
    transform: "scale(0.95)",
    transition: "0.25s",
    "&:hover": {
      transform: "scale(1)",
    },
    [theme.breakpoints.down("lg")]: {
      height: "6vh",
    },
  },
  denied: {
    height: "7.5vh",
    width: "80%",
    border: `1px solid ${theme.palette.error.main}`,
    color: theme.palette.error.main,
    borderRadius: "5px",
    cursor: "pointer",
    transform: "scale(0.95)",
    transition: "0.25s",
    "&:hover": {
      transform: "scale(1)",
    },
    [theme.breakpoints.down("lg")]: {
      height: "6vh",
    },
  },
  approved: {
    height: "7.5vh",
    width: "80%",
    border: `1px solid ${theme.palette.success.main}`,
    color: theme.palette.success.main,
    borderRadius: "5px",
    cursor: "pointer",
    transform: "scale(0.95)",
    transition: "0.25s",
    "&:hover": {
      transform: "scale(1)",
    },
    [theme.breakpoints.down("lg")]: {
      height: "6vh",
    },
  },
  uploadSuccess: {
    height: "7.5vh",
    width: "80%",
    border: `1px dashed ${theme.palette.success.main}`,
    color: theme.palette.success.main,
    borderRadius: "5px",
    cursor: "pointer",
    transform: "scale(0.95)",
    transition: "0.25s",
    "&:hover": {
      transform: "scale(1)",
    },
    [theme.breakpoints.down("lg")]: {
      height: "6vh",
    },
  },
  uploadContent: {
    color: "black",
    display: "flex",
    cursor: "pointer",
    padding: "0 7.5vh", 
    [theme.breakpoints.down("lg")]: {
      height: "6vh",
    },
  },
  dragAndDropText: {
    marginLeft: 4,
  },
  selectFileText: {
    fontSize: "1rem",
    fontWeight: 600,

    marginLeft: "2px",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  iconUpload: {
    marginRight: "12px",
  },
  selectedFile: {
    color: theme.palette.success.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "0.9rem",
    fontWeight: 600,
  },
  checkIcon: {
    marginLeft: 8,
    marginBottom: 4,
  },
}))(FileUploader);
