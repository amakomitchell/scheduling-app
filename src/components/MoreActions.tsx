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
    setIsModalOpen: (value: boolean) => void;
    setSelectedActivity: (value: Activity | undefined) => void;
};

const MoreActions: FC<MoreActionsProps> = ({ activity, setIsModalOpen, setSelectedActivity}) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const canBeOpen = Boolean(anchorEl);
    const id = canBeOpen ? 'simple-popover' : undefined;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const handleClose = () => {
        setOpen(false);
        setAnchorEl(null);
    }

    const editActivity = (activity: Activity) => {
        setSelectedActivity(activity);
        setIsModalOpen(true);
    }

    return (
        <>
            <Box aria-describedby={id} onClick={handleClick} className=''><MoreVertIcon /></Box>
            <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}>
              <Paper style={{ cursor: "pointer"}}>
                <Box display="flex" alignItems="center" justifyContent="center" onClick={() => editActivity(activity)}>
                  <CreateIcon fontSize='small' />
                  <Typography sx={{ p: 1 }}>Edit</Typography>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <DeleteIcon fontSize='small' />
                  <Typography sx={{ p: 1 }}>Delete</Typography>
                </Box>
              </Paper>
            </Popover>
        </>
    )
}

export default MoreActions;