import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { Activity } from '../types/activity';

type MoreActionsProps = {
    activity: Activity;
    onEdit: (activity: Activity) => void;
    onDelete: (activityId: string) => void;
};

const MoreActions: FC<MoreActionsProps> = ({ activity, onEdit, onDelete}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isOpen = Boolean(anchorEl);
    const id = isOpen ? 'simple-popover' : undefined;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event: any) => {
        event.stopPropagation();
        setAnchorEl(null);
    }

    const editActivity = (event: any) => {
        event.stopPropagation();
        onEdit(activity);
    }

    const deleteActivity = (event: any) => {
        if (window.confirm(`Are you sure you want to delete Activity?`)) {
            onDelete(activity.id)
            handleClose(event)
        }
    }

    return (
        <>
            <Box aria-describedby={id} onClick={handleClick} className=''><MoreVertIcon /></Box>
            <Popover id={id} open={isOpen} anchorEl={anchorEl} onClose={handleClose}>
              <Paper style={{ cursor: "pointer"}}>
                <Box display="flex" alignItems="center" justifyContent="center" onClick={editActivity}>
                  <CreateIcon fontSize='small' />
                  <Typography sx={{ p: 1 }}>Edit</Typography>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center" onClick={deleteActivity}>
                  <DeleteIcon fontSize='small' />
                  <Typography sx={{ p: 1 }}>Delete</Typography>
                </Box>
              </Paper>
            </Popover>
        </>
    )
}

export default MoreActions;