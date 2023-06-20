
import React, { FC, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Activity } from '../types/activity';

type ActivityFormModalProps = {
  isOpen: boolean;
  activity?: Activity;
  handleClose: () => void;
}

const ActivityFormModal: FC<ActivityFormModalProps> = ({ isOpen, activity, handleClose}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [data, setData] = useState<Partial<Activity>>(activity || { id: uuidv4() })
  
  const isEditMode = Boolean(activity);

  
  return (
    <Dialog
    fullScreen={fullScreen}
    open={isOpen}
    onClose={handleClose}
    aria-labelledby="responsive-dialog-title"
  >
    <DialogTitle id="responsive-dialog-title">
      {`${isEditMode ? 'Edit' : 'Add New'} Activity`}
    </DialogTitle>
    <DialogContent>
      <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel htmlFor="demo-dialog-native">Type</InputLabel>
          <Select
            native
            value='Age 1'
            // onChange={handleChange}
            input={<OutlinedInput label="Age" id="demo-dialog-native" />}
          >
            <option aria-label="None" value="" />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-dialog-select-label">Performer</InputLabel>
          <Select
            labelId="demo-dialog-select-label"
            id="demo-dialog-select"
            value='Age 2'
            // value={age}
            // onChange={handleChange}
            input={<OutlinedInput label="Age" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel htmlFor="demo-dialog-native">Type</InputLabel>
          <Select
            native
            value='Age 1'
            // onChange={handleChange}
            input={<OutlinedInput label="Age" id="demo-dialog-native" />}
          >
            <option aria-label="None" value="" />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-dialog-select-label">Performer</InputLabel>
          <Select
            labelId="demo-dialog-select-label"
            id="demo-dialog-select"
            value='Age 2'
            // value={age}
            // onChange={handleChange}
            input={<OutlinedInput label="Age" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleClose}>
        Cancel
      </Button>
      <Button autoFocus>
        {`${isEditMode ? 'Update' : 'Create'}`}
      </Button>
    </DialogActions>
  </Dialog>
  )
}
export default ActivityFormModal;
