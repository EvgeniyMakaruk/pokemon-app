import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import './CustomComponentsStyles.scss'

export const SelectCustom = ({ label, values, handleChange, value }) => {
  return (
      <FormControl fullWidth className='selectCustom'>
           <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
          >
                 {
                 values.map((color, id) => (
                      <MenuItem key={id} value={color} onClick={() => handleChange(color)}>{color}</MenuItem>
                 ))
                 }
          </Select>
      </FormControl>
  )
}
