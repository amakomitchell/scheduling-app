import React, { useState } from 'react';
import { Activity } from '../types/activity';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { ACTIVITY_TYPES, PERFORMERS, PITCHES } from '../repository/constants';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ActivityFormModal from './ActivityFormModal';
import { useGetActivities } from '../repository/queries';

function ActivityList() {
  const [activities, setActivities] = useState<Activity>();

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // open modal for add new activity
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity>();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  // Toggle modal for add new activity
  const handleToggleModal = () => {
    if (selectedActivity) setSelectedActivity(undefined);

    setIsModalOpen((prev) => !prev)
  }

  const editActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  }

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;


  const { data: activitiesData, isLoading } = useGetActivities();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && !activitiesData) {
    return <div>Not found</div>;
  }

  return (
    <Box mt={10}>
      <Box display="flex" justifyContent="space-between" mb={5}>
        <Typography variant='h4' fontWeight="bold">Activities</Typography>
        <Button variant="contained" endIcon={<AddIcon />} onClick={handleToggleModal}>
          Add New
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell><Typography variant='h6' fontWeight="bold">Type</Typography ></TableCell>
              <TableCell align="right"><Typography variant='h6' fontWeight="bold">Performer</Typography></TableCell>
              <TableCell align="right"><Typography variant='h6' fontWeight="bold">Pitch</Typography></TableCell>
              <TableCell align="right"><Typography variant='h6' fontWeight="bold">Date/Time</Typography></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activitiesData.map((activity) => {
              const type = ACTIVITY_TYPES.find(
                (activityType) => activityType.id === activity.type
              );
              const performer = PERFORMERS.find(
                (activityPerformer) => activityPerformer.id === activity.performer
              );
              const pitch = PITCHES.find((activityPitch) => activityPitch.id === activity.pitch)
              return (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {type?.name}
                  </TableCell>
                  <TableCell align="right">{performer?.name}</TableCell>
                  <TableCell align="right">{pitch?.name}</TableCell>
                  <TableCell align="right">{format(new Date(activity.date), 'dd.MM.yyyy hh:mm')}</TableCell>
                  <TableCell align="right">
                    <div aria-describedby={id} onClick={handleClick} className=''><MoreVertIcon /></div>
                    <Popper id={id} open={open} anchorEl={anchorEl} transition>
                      {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                      <Paper>
                        <Box onClick={() => editActivity(activity)}>
                          <Typography justifyContent="center" sx={{ p: 1 }}><CreateIcon fontSize='small' />Edit</Typography>
                        </Box>
                        <Typography sx={{ p: 1 }}><DeleteIcon fontSize='small' />Delete</Typography>
                      </Paper>
                    </Fade>
                      )}
                    </Popper>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {isModalOpen && <ActivityFormModal isOpen={isModalOpen} handleClose={handleToggleModal} activity={selectedActivity} />}
    </Box>
  );
}
export default ActivityList;
