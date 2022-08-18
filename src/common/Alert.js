import Alert from '@mui/material/Alert'

export const AlertCustom = ({ status, text }) => {
  return <Alert severity={status}>{text}</Alert>
}
