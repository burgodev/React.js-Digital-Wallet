import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { withStyles, MenuItem, TextField } from "@material-ui/core";

import { Typography, Card, Button, Divider, Flex } from "../../../../../../_common/components";
import { useSnackbar } from "../../../../../../_common/hooks"
// import api from "../../../../../../services/api";

const ChangeLevelContent = ({ classes, onClose, item }) => {
  const [loading, setLoading] = useState(false)
  const [managerList, setManagerList] = useState([])
  const [manager, setManager] = useState()
  const [openSnackbar] = useSnackbar();

  const getLevelList = useCallback(async () => {
    try {
      // const { data } = await api.get(/endpoint)
      setManagerList([]);
      openSnackbar("success", "error")
    } catch (e) {
      openSnackbar(e.response.data.message, "error")
    } finally {
      setLoading(false)
    }
  }, [openSnackbar])

  useEffect(() => {
    getLevelList()
  }, [getLevelList])


  const handleSubmit = () => {
    try {
      // const payload = {
      //   id: item.id,
      //   manager: manager
      // }
      // const { data } = await api.get("/endpoint", payload )
      openSnackbar("Avaliado com sucesso", "success")

    } catch (e) {
      openSnackbar(e.response.data.message, "error")
    } finally {
      setLoading(false)
      onClose();
    }
  }
  return (
    <Card clean className={classes.accountType}>
      <Flex center flexDirection="column">
        <Typography className={classes.subtitle} width="80%">
          Selecione o nível do gestor
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
          value={manager}
          onChange={(e) => setManager(e.target.value)}
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

      <Button onClick={() => manager ? handleSubmit() : onClose()} className={classes.button} loading={loading}>
        Confirmar
      </Button>
    </Card >
  );
};

ChangeLevelContent.propTypes = {
  classes: PropTypes.object,
  item: PropTypes.object,
  onClose: PropTypes.func.isRequired,
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
}))(ChangeLevelContent);
