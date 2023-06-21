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
import { ACTIVITY_TYPES, PERFORMERS, PITCHES } from '../repository/constants';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ActivityFormModal from './ActivityFormModal';
import { useGetActivities } from '../repository/queries';
import MoreActions from './MoreActions';
import { useDeleteActivity } from '../repository/mutations';
import ActivityDetailDialog from './ActivityDetailDialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function ActivityList() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));

  const { data: activitiesData, isLoading } = useGetActivities();
  const { mutate: deleteActivity} = useDeleteActivity();

  // open modal for add new activity
  const [isModalActionsOpen, setIsModalActionsOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity>();
  const [ isActivityDetailModalOpen, setIsActivityDetailModalOpen ] = useState(false);

  const handleToggleModal = () => {
    if (selectedActivity) setSelectedActivity(undefined);
    setIsModalActionsOpen((prev) => !prev)
  }

  const handleEdit = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsModalActionsOpen(true);
  }

  const handleDelete = (activityId: string) => {
    deleteActivity(activityId);
  }

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsActivityDetailModalOpen(true);
  };

  const handleCloseActivityDetailModal = () => {
    setIsActivityDetailModalOpen(false);
  }

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
                <TableRow key={activity.id} style={{cursor: "pointer"}} onClick={() => handleActivityClick(activity)}>
                  <TableCell component="th" scope="row">
                    {type?.name}
                  </TableCell>
                  <TableCell align="right">{performer?.name}</TableCell>
                  <TableCell align="right">{pitch?.name}</TableCell>
                  <TableCell align="right">{format(new Date(activity.date), 'dd.MM.yyyy hh:mm aa')}</TableCell>
                  <TableCell align="right">
                    <MoreActions activity={activity} onEdit={handleEdit} onDelete={handleDelete} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {isModalActionsOpen && <ActivityFormModal isOpen={isModalActionsOpen} handleClose={handleToggleModal} activity={selectedActivity} />}
      {isActivityDetailModalOpen && <ActivityDetailDialog isModalOpen={isActivityDetailModalOpen} handleModalClose={handleCloseActivityDetailModal} activity={selectedActivity} />}
    </Box>
  );
}
export default ActivityList;
