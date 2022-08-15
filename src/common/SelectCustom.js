import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import './CustomComponentsStyles.scss'

export const SelectCustom = ({ label, values }) => {
  return (
      <FormControl fullWidth className='selectCustom'>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={}
              label={label}
              // onChange={handleChange}
          >
                 {
                  Object.keys(values).map((color, id) => (
                      <MenuItem key={id} value={color}>{color}</MenuItem>
                  ))
                 }
          </Select>
      </FormControl>
  )
}
