import { CircularProgress } from '@mui/material'

export const LoaderCustom = ({ customStyles }) => {
  return (
      <div style={{ ...customStyles }}>
        <CircularProgress />
      </div>
  )
}
