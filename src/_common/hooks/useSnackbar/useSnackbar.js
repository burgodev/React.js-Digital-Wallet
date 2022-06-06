import useErrorSnackbar from "./hooks/useErrorSnackbar"
import useSuccessSnackbar from "./hooks/useSuccessSnackbar"
import useDefaultSnackbar from "./hooks/useDefaultSnackbar"

const SEVERITY_TYPES = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  DEFAULT: "DEFAULT"
}

const useSnackbar = () => {
  const [openErrorSnackbar] = useErrorSnackbar();
  const [openSuccessSnackbar] = useSuccessSnackbar();
  const [openDefaultSnackbar] = useDefaultSnackbar();

  const openSnackbar = (msg, severity) => {
    switch (severity?.toUpperCase()) {
      case SEVERITY_TYPES.SUCCESS: {
        openSuccessSnackbar(msg)
        break;
      }
      case SEVERITY_TYPES.ERROR: {
        openErrorSnackbar(msg)
        break;
      }
      default: {
        openDefaultSnackbar(msg)
        break;
      }
    }
  }

  return [openSnackbar]
};

export default useSnackbar
