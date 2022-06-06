import React, { useState, useEffect } from "react";
import { TextField, MenuItem } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import axios from "axios";
import { Loading } from "../";

const SelectCountry = ({ formik, onChange, ...props }) => {
  const i18n = useTranslation().t;
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllCountries();
  }, []);

  const getAllCountries = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("https://api.countrystatecity.in/v1/countries", {
        headers: {
          "X-CSCAPI-KEY": "WmkyZzdPWlhNTTB4dkdvRzl1Y0Z4UVZxa2FXdGs0WlNhakg1bUR3WQ=="
        }
      });
      setCountries(data)
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
      id="country"
      name="address.country_id"
      label={i18n("select.country")}
      select
      InputLabelProps={{ shrink: true }}
      size="small"
      value={formik.values.address?.country_id}
      onChange={onChange}
      error={
        formik.touched.address?.country_id &&
        Boolean(formik.errors.address?.country_id)
      }
      helperText={
        formik.touched.address?.country_id && formik.errors.address?.country_id
      }
      InputProps={{        
        startAdornment: (
          <Loading size={18} isLoading={loading} style={{ width: "auto" }} />
        ),
      }}
      {...props}
    >
      {countries.length > 0 ? (
        countries.map((country) => (
          <MenuItem value={country.iso2} key={country.iso2}>
            {country.name}
          </MenuItem>
        ))
      ) : (
        <MenuItem>{i18n("select.noData")}</MenuItem>
      )}
    </TextField>
  );
};

SelectCountry.propTypes = {
  formik: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SelectCountry;
