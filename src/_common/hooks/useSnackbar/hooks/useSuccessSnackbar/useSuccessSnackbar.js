import { useSnackbar } from 'react-simple-snackbar'
import { theme } from "../../../../utils/theme"

const options = {
  style: {
    backgroundColor: theme.palette.success.main,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
}

const useSuccessSnackbar = () => {
  const [open] = useSnackbar(options)

  const openSnackbar = (msg) => {
    open(msg)
  }

  return [openSnackbar]
};

export default useSuccessSnackbar
