import React, { useState, useEffect } from "react";
import { TextField, MenuItem } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import axios from "axios"
import { Loading } from "../";


const SelectCity = ({ formik, onChange, ...props }) => {
  const i18n = useTranslation().t;
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCities = async (country, state) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`, {
        headers: {
          "X-CSCAPI-KEY": "WmkyZzdPWlhNTTB4dkdvRzl1Y0Z4UVZxa2FXdGs0WlNhakg1bUR3WQ=="
        }
      });
      setCities(data)
    } catch (e) {
      console.log("API ERROR - SelectCountry.js", e)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCities(formik.values.address?.country_id, formik.values.address?.state);
  }, [formik.values.address?.country_id, formik.values.address?.state]);

  return (
    <TextField
      variant="outlined"
      fullWidth
      id="textfield-city"
      name="address.city"
      label={i18n("select.city")}
      select
      InputLabelProps={{ shrink: true }}
      size="small"
      value={formik.values.address?.city}
      onChange={onChange}
      error={formik.touched.address?.city && Boolean(formik.errors.address?.city)}
      helperText={formik.touched.address?.city && formik.errors.address?.city}
      InputProps={{
        startAdornment: (
          <Loading size={18} isLoading={loading} style={{ width: "auto" }} />
        ),
      }}
      {...props}
    >
      {cities.length > 0 ? (
        cities.map((city) => (
          <MenuItem value={city.name} key={city.name}>
            {city.name}
          </MenuItem>
        ))
      ) : (
        <MenuItem>{i18n("select.noData")}</MenuItem>
      )}
    </TextField>
  );
};

SelectCity.propTypes = {
  formik: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SelectCity;

