
import React, { FC, useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Activity } from '../types/activity';
import { ACTIVITY_TYPES, PERFORMERS, PITCHES } from '../repository/constants';
import { useCreateActivity, useUpdateActivity } from '../repository/mutations';

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

  const { mutate: createActivity} = useCreateActivity();
  const { mutate: updateActivity } = useUpdateActivity()

  const handleSubmit = useCallback(() => {
    const mutate = isEditMode ? updateActivity : createActivity;
    mutate(data as Activity);
    handleClose();
  }, [data, isEditMode])
  
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
        <FormControl sx={{ m: 1, minWidth: 250 }}>
          <InputLabel htmlFor="demo-dialog-native">Type</InputLabel>
          <Select
            labelId="demo-dialog-select-label"
            id="demo-dialog-select"
            value={data.type}
            onChange={(event) => setData({ ...data, type:event.target.value })}
            input={<OutlinedInput label="Age" id="demo-dialog-native" />}
          >
            {ACTIVITY_TYPES.map((type) => (
              <MenuItem key={type?.id} value={type.id}>{type.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 250 }}>
          <InputLabel id="demo-dialog-select-label">Performer</InputLabel>
          <Select
            labelId="demo-dialog-select-label"
            id="demo-dialog-select"
            value={data.performer}
            onChange={(event) => setData({ ...data, performer:event.target.value })}
            input={<OutlinedInput label="Age" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {PERFORMERS.map((performer) => (
              <MenuItem key={performer?.id} value={performer.id}>{performer.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <FormControl sx={{ m: 1, minWidth: 250 }}>
          <InputLabel htmlFor="demo-dialog-native">Pitch</InputLabel>
          <Select
            labelId="demo-dialog-select-label"
            id="demo-dialog-select"
            value={data.pitch}
            onChange={(event) => setData({ ...data, pitch:event.target.value })}
            input={<OutlinedInput label="Age" id="demo-dialog-native" />}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {PITCHES.map((pitch) => (
              <MenuItem key={pitch?.id} value={pitch.id}>{pitch.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker value={new Date(data.date!)} onChange={(newValue) => setData({...data, date: newValue ?? undefined})} label="Date/Time" />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={handleClose}>
        Cancel
      </Button>
      <Button autoFocus onClick={handleSubmit}>
        {`${isEditMode ? 'Update' : 'Create'}`}
      </Button>
    </DialogActions>
  </Dialog>
  )
}
export default ActivityFormModal;
