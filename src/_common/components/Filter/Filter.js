import React, { useEffect, Fragment, useState } from "react";
import { withStyles, MenuItem, InputAdornment } from "@material-ui/core";
import PropTypes from "prop-types";

import { FiSearch } from "react-icons/fi";
import dolarSign from "../../../assets/images/dolar-sign.svg";

import { useDebouncedState } from "../../hooks";
import { Flex, TextField } from "../";

const Filter = ({ classes, filterList, callback, noFlex = false, ...props }) => {
  const [debouncedFilter, setFilter, filter] = useDebouncedState({});
  const [Wrapper, setWrapper] = useState(noFlex ? Fragment : Flex);

  useEffect(() => {
    setWrapper(noFlex ? Fragment : Flex);
  }, [noFlex]);

  useEffect(() => {
    const arr = filterList.map((item) => item.name);
    const obj = {};
    // consigo substituir esse for por outra função de arr?
    // transforma um array de string em um objeto com atributos
    for (let i = 0; i < arr.length; i++) {
      obj[arr[i]] = "";
    }

    setFilter(obj);
  }, [filterList, setFilter]);

  useEffect(() => {
    callback(debouncedFilter);
  }, [debouncedFilter, callback]);

  return (
    <Wrapper {...props}>
      {filterList.map((item) =>
        item.type === "select" ? (
          <TextField
            variant="outlined"
            className={classes.textfield}
            id={`input-${item.name}`}
            key={`input-${item.name}`}
            name={item.name}
            label={item.label}
            style={{ width: item.width }}
            select
            size="small"
            InputLabelProps={{ shrink: true }}
            value={filter[item.name]}
            onChange={(e) =>
              setFilter({ ...filter, [item.name]: e.target.value })
            }
          >
            {item.list.map(({ id, text }) => (
              <MenuItem value={id} key={id}>{text}</MenuItem>
            ))}
          </TextField>
        ) : (
          <TextField
            variant="outlined"
            InputProps={{
              startAdornment:
                (item.type === "text" && (
                  <InputAdornment position="start">
                    <FiSearch />
                  </InputAdornment>
                )) ||
                (item.type === "number" && (
                  <img
                    src={dolarSign}
                    className={classes.iconImageInputFilter}
                    alt=""
                  />
                )),
            }}
            className={classes.textfield}
            style={{ width: item.width }}
            id={`input-${item.name}`}
            key={`input-${item.name}`}
            name={item.name}
            label={item.label}
            type={item.type}
            size="small"
            InputLabelProps={{ shrink: true }}
            value={filter[item.name]}
            onChange={(e) =>
              setFilter({ ...filter, [item.name]: e.target.value })
            }
          />
        )
      )}
    </Wrapper>
  );
};

export default withStyles((theme) => ({
  textfield: {
    marginRight: 12,
    width: 200,
  },
  iconImageInputFilter: {
    marginRight: 8,
  },
}))(Filter);

Filter.propTypes = {
  classes: PropTypes.object,
  filterList: PropTypes.array.isRequired, // lista dos filtros gerados
  callback: PropTypes.func.isRequired, // função de retorno do valor dos filtros
  noFlex: PropTypes.bool, // permite controlar o layout dos filtros externamente
};
