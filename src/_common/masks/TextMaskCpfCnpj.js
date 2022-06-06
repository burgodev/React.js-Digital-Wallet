// import React from "react";
// import PropTypes from "prop-types";
// import MaskedInput from "react-text-mask";

// import { withStyles } from "@material-ui/core";

// const placeholderChar = "\u2000";
// export const cpf = [
//   /\d/,
//   /\d/,
//   /\d/,
//   ".",
//   /\d/,
//   /\d/,
//   /\d/,
//   ".",
//   /\d/,
//   /\d/,
//   /\d/,
//   "-",
//   /\d/,
//   /\d/,
// ];
// // export const cnpj = [
// //   /\d/,
// //   /\d/,
// //   ".",
// //   /\d/,
// //   /\d/,
// //   /\d/,
// //   ".",
// //   /\d/,
// //   /\d/,
// //   /\d/,
// //   "/",
// //   /\d/,
// //   /\d/,
// //   /\d/,
// //   /\d/,
// //   "-",
// //   /\d/,
// //   /\d/,
// // ];

// const resolveMask = (value) => cpf;

// // const resolveMask = (value) =>
// // value.replace(/\D/g, "").length > cpf.length - 3 ? cnpj : cpf;

// function TextMaskCpfCnpj({ ...other }) {
//   return (
//     <MaskedInput
//       {...other}
//       placeholderChar={placeholderChar}
//       guide={false}
//       mask={(rawValue) => {
//         let val = rawValue || "";
//         val = val.replace(/\s/g, "");
//         return resolveMask(val);
//       }}
//     />
//   );
// }

// TextMaskCpfCnpj.propTypes = {
//   inputRef: PropTypes.func.isRequired,
// };

// export default withStyles({ root: {} })(TextMaskCpfCnpj);

// export const cpfMask = (value = "") =>
//   value
//     .replace(/\D/g, "")
//     .replace(/(\d{3})(\d)/, "$1.$2")
//     .replace(/(\d{3})(\d)/, "$1.$2")
//     .replace(/(\d{3})(\d{1,2})/, "$1-$2")
//     .replace(/(-\d{2})\d+?$/, "$1");

// // export const cnpjMask = (value = "") =>
// //   value?.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5");
