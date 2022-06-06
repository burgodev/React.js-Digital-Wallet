import { useSnackbar } from 'react-simple-snackbar'
import { theme } from "../../../../utils/theme"

const options = {
  style: {
    backgroundColor: theme.palette.error.main,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
}

const useErrorSnackbar = () => {
  const [open] = useSnackbar(options)

  const openSnackbar = (msg) => {
    open(msg)
  }

  return [openSnackbar]
};

export default useErrorSnackbar
