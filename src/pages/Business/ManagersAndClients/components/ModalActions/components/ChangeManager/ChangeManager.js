import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { withStyles, MenuItem, TextField } from "@material-ui/core";
import { useFormikContext } from "formik";

import { Typography, Card, Button, Divider, Flex } from "../../../../../../../_common/components";
import { useSnackbar } from "../../../../../../../_common/hooks"
// import api from "../../../../../../services/api";

const ChangeManager = ({ classes, }) => {
  const formik = useFormikContext();
  const [loading, setLoading] = useState(false)
  const [managerList, setManagerList] = useState([])  
  const [openSnackbar] = useSnackbar();

  const getManagerList = useCallback(async () => {
    try {
      // const { data } = await api.get(/endpoint)
      setManagerList([]);
    } catch (e) {
      openSnackbar(e.response.data.message, "error")
    } finally {
      setLoading(false)
    }
  }, [openSnackbar])

  useEffect(() => {
    getManagerList()
  }, [getManagerList])


  return (
    <Card clean className={classes.accountType}>
      <Flex center flexDirection="column">
        <Typography className={classes.subtitle} width="80%">
          Selecione o ID do gestor N1
        </Typography>
        <Divider className={classes.divider} margin="0 0 24px" />

        <TextField
          variant="outlined"
          className={classes.textfield}
          id="select-manager"
          label="Gestor"
          select
          InputLabelProps={{ shrink: true }}
          size="small"       
          name="manager"      
          value={formik.values.manager}
          onChange={formik.handleChange}
          error={formik.touched.manager && Boolean(formik.errors.manager)}
          helperText={formik.touched.manager && formik.errors.manager}
        >
          {managerList.length > 0 ? (
            managerList.map((state) => (
              <MenuItem value={state.isoCode} key={state.isoCode}>
                {state.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem>Não existe dados para essa busca</MenuItem>
          )}
        </TextField>
      </Flex>
      
      <Button type="submit" className={classes.button} loading={loading}>
        Confirmar
      </Button>
    </Card >
  );
};

ChangeManager.propTypes = {
  classes: PropTypes.object,
  submit: PropTypes.bool,
  nextStep: PropTypes.func.isRequired,
};

export default withStyles((theme) => ({
  subtitle: {
    fontWeight: "bold",
    fontSize: 28,
  },
  accountType: {
    height: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "16px",
  },
  button: {
    margin: "0 8px",
    height: 48,
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
  textfield: {
    width: "80%"
  }
}))(ChangeManager);
