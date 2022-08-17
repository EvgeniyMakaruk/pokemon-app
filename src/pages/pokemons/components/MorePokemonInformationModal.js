import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import '../pokemonStyles.scss'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: 'none',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4
}

export const MorePokemonInformationModal = ({ open, setOpen, value, content }) => {
  return (
        <div>
          <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {value}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {content}
              </Typography>
              <Button onClick={() => setOpen(false)} style={{ marginTop: '15px' }} variant='contained'>Close</Button>
            </Box>
          </Modal>
        </div>
  )
}
