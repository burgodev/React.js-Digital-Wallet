import React, { useState, useEffect } from "react";
import { Avatar, withStyles, TextField, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";

import brFlag from "../../../assets/images/br_flag.svg";
import usFlag from "../../../assets/images/usa_flag.svg";
// import esflag from "../../../assets/images/es-img.png";
// import itFlag from "../../../assets/images/italian-img.png";

const SelectLanguage = ({ classes }) => {
  const [selectedLang, setSelectedLang] = useState("br");
  const [languages /*, setLanguages*/] = useState(MOCKUP);

  const reload = (e) => {
    setSelectedLang(e.target.value)    
    localStorage.setItem("i18nextLng", e.target.value);
    window.location.reload(true);
  };

  useEffect(() => {  
    setSelectedLang(localStorage.getItem("i18nextLng"))
  }, [])

  return (
    <TextField
      id="select-language"
      select
      size="small"
      value={selectedLang}
      onChange={reload}
    >
      {languages.map(({ src, value }) =>
        <MenuItem key={value} value={value}>
          <Avatar
            variant="rounded"
            src={src}
            className={classes.countryFlag}
          />
        </MenuItem>
      )}
    </TextField >
  )
};

export default withStyles((theme) => ({
  countryFlag: {
    maxWidth: "34px",
    maxHeight: "24px",
    border: "2px solid #fafafa",
    cursor: "pointer",
  },
}))(SelectLanguage);

SelectLanguage.propTypes = {
  classes: PropTypes.object,
};

const MOCKUP = [
  {
    value: "br",
    src: brFlag
  },
  {
    value: "en",
    src: usFlag
  },
  // {
  //   value: "es",
  //   src: esflag
  // },
  // {
  //   value: "it",
  //   src: itFlag
  // },
]
