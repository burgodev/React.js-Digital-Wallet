// import React, { useMemo } from "react";
// import PropTypes from "prop-types";
// import MaskedInput from "react-text-mask";
// import { withStyles } from "@material-ui/core";

// const MAX_LENGTH = 20;
// const placeholderChar = "\u2000";
// const FILLMASK = "#########################";

// const getPhoneMask = (ddi, phone) => {
//   let mask = "";
//   switch (Number(ddi)) {
//     case 55: {
//       switch (phone?.length) {
//         case 11:
//           mask = "(##) #####-####";
//           break;
//         default:
//           mask = "(##) ####-####";
//       }
//       break;
//     }
//     default:
//       mask = "(###) ";
//   }

//   mask = `${mask}${FILLMASK}`;

//   let count = 0;
//   let index = mask.indexOf("#");
//   while (index !== -1 && count <= MAX_LENGTH) {
//     count++;
//     index = mask.indexOf("#", index + 1);
//   }
//   return mask.substring(0, index - 1);
// };

// function TextMaskTelefone({  ddi, value, ...other }) {
//   const mask = useMemo(
//     () => Array.from(getPhoneMask(ddi, String(value || "").replace(/\D/g, ""))).map(x => (x === "#" ? /\d/ : x)),
//     [value, ddi]
//   );

//   return (
//     <MaskedInput
//       {...other}
//       value={value}
//       // ref={ref => inputRef(ref ? ref.inputElement : null)}
//       guide={false}
//       placeholderChar={placeholderChar}
//       mask={mask}
//     />
//   );
// }

// TextMaskTelefone.propTypes = {
//   inputRef: PropTypes.func.isRequired,
//   ddi: PropTypes.string,
//   value: PropTypes.string,
// };

// export default withStyles({ root: {} })(TextMaskTelefone);
