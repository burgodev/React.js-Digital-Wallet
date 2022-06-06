import React, { useState, useEffect } from "react";
import { TextField, MenuItem } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import axios from "axios"
import { Loading } from "../";


const SelectState = ({ formik, onChange, ...props }) => {
  const i18n = useTranslation().t;
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStatesByCountryCode(formik.values.address?.country_id);
  }, [formik.values.address?.country_id]);

  const getStatesByCountryCode = async (selectedCountry) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://api.countrystatecity.in/v1/countries/${selectedCountry}/states`, {
        headers: {
          "X-CSCAPI-KEY": "WmkyZzdPWlhNTTB4dkdvRzl1Y0Z4UVZxa2FXdGs0WlNhakg1bUR3WQ=="
        }
      });      
      setStates(data)
    } catch (e) {
      console.log("API ERROR - SelectCountry.js", e)
    } finally {
      setLoading(false);
    }
  };

  return (
    <TextField
      variant="outlined"
      fullWidth
      id="state"
      name="address.state"      
      label={i18n("select.state")}   
      select
      InputLabelProps={{ shrink: true }}
      size="small"
      value={formik.values.address?.state}
      onChange={onChange}
      error={
        formik.touched.address?.state && Boolean(formik.errors.address?.state)
      }
      helperText={formik.touched.address?.state && formik.errors.address?.state}
      InputProps={{        
        startAdornment: (
          <Loading size={18} isLoading={loading} style={{ width: "auto" }} />
        ),
      }}
      {...props}
    >
      {states.length > 0 ? (
        states.map((state) => (
          <MenuItem value={state.iso2} key={state.iso2}>
            {state.name}
          </MenuItem>
        ))
      ) : (
        <MenuItem>{i18n("select.noData")}</MenuItem>
      )}
    </TextField>
  );
};

SelectState.propTypes = {
  formik: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};


export default SelectState;
