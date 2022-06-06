import { useSnackbar } from 'react-simple-snackbar'

const options = {
  style: {
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
}

const useDefaultSnackbar = () => {
  const [open] = useSnackbar(options)

  const openSnackbar = (msg) => {
    open(msg)
  }

  return [openSnackbar]
};

export default useDefaultSnackbar
