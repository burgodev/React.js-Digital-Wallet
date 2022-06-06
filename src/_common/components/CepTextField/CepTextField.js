import React, { useEffect, useState, useCallback } from "react";
import { useFormikContext } from "formik";
import PropTypes from "prop-types";
import { withStyles, TextField, FormHelperText } from "@material-ui/core";
import axios from "axios";

import { useDebouncedState } from "../../hooks";
// import TextMaskCep from "../../masks/TextMaskCep";
import { Loading, Flex } from "../";

const initialValues = {
  street: "",
  ddd: "",
  neighborhood: "",
  complement: "",
  state: "",
  city: "",
  cep: "",
};

const CepTextfield = ({
  classes,
  className,
  initialValue,
  width,
  size = "small",
}) => {
  const [debouncedFilter, setValue, value] = useDebouncedState(initialValue);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { values, setValues } = useFormikContext();

  useEffect(() => {
    const getCep = async () => {
      try {
        setLoading(true);    
        const parsed = debouncedFilter.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
        const { data } = await axios.get(
          `https://viacep.com.br/ws/${parsed}/json/`
        );

        if (data.erro) throw new Error();
        const obj = {
          street: data.logradouro,
          // ddd: data.ddd,
          country_id: "BR",
          neighborhood: data.bairro,
          state: data.uf,
          city: data.localidade,
          cep: data.cep,
        };

        setData(obj);
        setError(false);
      } catch (e) {
        console.log(e);
        setError(true);
        setData(initialValues);
      } finally {
        setLoading(false);
      }
    };

    if (debouncedFilter?.length) getCep();
  }, [debouncedFilter]);

  const callback = useCallback(() => {
    setValues({
      ...values,
      address: { ...values.address, ...data },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    callback();
  }, [data, callback]);

  return (
    <Flex flexDirection="column" className={classes.flex} style={{ width }}>
      <TextField
        variant="outlined"
        id="textfield-cep"
        label="CEP"
        InputLabelProps={{ shrink: true }}
        size={size}
        value={value}
        className={className}
        onChange={(e) => setValue(e.target.value)}
        InputProps={{
          // inputComponent: TextMaskCep,
          startAdornment: (
            <Loading size={18} isLoading={loading} style={{ width: "auto" }} />
          ),
        }}
      />
      {error && (
        <FormHelperText id="textfield-cep" className={classes.error}>
          CEP inválido
        </FormHelperText>
      )}
    </Flex>
  );
};

CepTextfield.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.object,
  initialValue: PropTypes.string,
  width: PropTypes.string,
  size: PropTypes.string,
};

export default withStyles((theme) => ({
  flex: {
    // margin: "0px 8px 16px 0",
    width: "100%",
  },
  error: {
    color: theme.palette.error.main,
  },
}))(CepTextfield);
