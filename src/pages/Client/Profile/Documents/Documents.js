import React, { useEffect, useState } from "react";
import { withStyles, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import {
  Typography,
  Button,
  Navigation,
  Container,
  FileUploader,
  Loading,
} from "../../../../_common/components";
import { useSnackbar, useNavigation } from "../../../../_common/hooks";
import api from "../../../../services/api";

const Documents = ({ classes }) => {
  const i18n = useTranslation().t;
  const navList = useNavigation("profile");
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [payload, setPayload] = useState([]);
  const [openSnackbar] = useSnackbar();
  const email = localStorage.getItem("email");

  useEffect(() => {
    getDocuments();
  }, []);

  const getDocuments = async () => {
    try {
      const { data } = await api.get("/user/profile/documents");
      setDocuments(data.payload);
    } catch (error) {
      console.log("ERROR - (/user/profile/documents)", error)
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await api.post("/auth/client/documents", {
        email: email,
        documents: payload,
      });
      openSnackbar("Documentos enviados com sucesso", "success")
    } catch (e) {
      openSnackbar(e.response.data.message, "error")

    } finally {
      setLoading(false);
    }
  };

  if (!documents.length) return <Container className={classes.container}><Loading isLoading size={48} className={classes.loading} /></Container>

  return (
    <Container className={classes.container} >
      <Navigation navList={navList} initialValue={"documents"} />
      <Grid container spacing={2} className={classes.gridContainer}>
        {documents.map(document =>
          <Grid item xs={12} key={document.id} className={classes.gridItem}>
            <Typography className={classes.name}>{document.name}</Typography>
            <FileUploader
              key={document.document_type_id}
              callback={(value) => setPayload([...payload, value])}
              docStatus={document.document_status}
              docType={document.document_type_id}
            />
          </Grid>
        )}
      </Grid>

      <Button onClick={handleSubmit} className={classes.button} loading={loading}>
        {i18n("button.save")}
      </Button>
    </Container>
  );
};

export default withStyles((theme) => ({
  container: {
    justifyContent: "space-between",
    flexDirection: "column",
    display: "flex",
    alignItems: "center"
  },
  gridContainer: {
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  title: {
    marginTop: 40,
    fontSize: 36,
    color: theme.palette.secondary.main,
    marginBottom: 32,
  },

  button: {
    marginTop: 8,
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  loading: {
    paddingTop: 40
  },
  gridItem: {
    display: "flex",
    flexDirection: "column"
  },
  name: {
    margin: "0 0 4px 0",
    [theme.breakpoints.down("lg")]: {
      fontSize: "14px",
    },
  }
}))(Documents);

Documents.propTypes = {
  classes: PropTypes.object,
};
