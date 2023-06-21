import React, { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Activity } from '../types/activity';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { useGetWeather } from '../repository/queries';
import { styled } from '@mui/material/styles';

type ActivityDetailDialogProps = {
    isModalOpen: boolean;
    activity?: Activity;
    handleModalClose: () => void;
};

const Item = styled(Grid)`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const HeaderText = styled(Typography)`
    fontSize: 1.2rem;
    fontWeight: 600;
`;

const BodyText = styled(Typography)`
    variant: body1;
`;

const ActivityDetailDialog: FC<ActivityDetailDialogProps> = ({ isModalOpen, activity, handleModalClose}) => {
      const theme = useTheme();
      const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

      const [coords, setCoords] = useState<GeolocationCoordinates | null>();
      const { data: weather, isLoading } = useGetWeather({ lat: coords?.latitude, lng: coords?.longitude });

      if(!activity) return null;

      return (
        <div>
          <Dialog
            fullScreen={fullScreen}
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
             {"Activity Detail"}
            </DialogTitle>
            <DialogContent>
              <Box>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={6}>
                        <Item>
                            <HeaderText>Temp:</HeaderText>
                            <BodyText>{weather?.main.temp}&deg;C</BodyText>
                        </Item>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Item>
                            <HeaderText variant='subtitle2'>Humidity:</HeaderText>
                            <BodyText>{weather?.main.humidity}%</BodyText>
                        </Item>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Item>
                            <HeaderText>Wind:</HeaderText>
                            <BodyText>{weather?.wind.speed}km/h</BodyText>
                        </Item>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Item>
                            <HeaderText>Feels Like:</HeaderText>
                            <BodyText>{weather?.main.feels_like}</BodyText>
                        </Item>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <HeaderText variant='subtitle2'>Type</HeaderText>
                        <BodyText>{activity.type}</BodyText>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <HeaderText variant='subtitle2'>Performer</HeaderText>
                        <BodyText>{activity.performer}</BodyText>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <HeaderText variant='subtitle2'>Pitch</HeaderText>
                        <BodyText>{activity.pitch}</BodyText>
                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <HeaderText variant='subtitle2'>Date/Time</HeaderText>
                        <BodyText>{format(new Date(activity.date), 'dd.MM.yyyy hh:mm aa')}</BodyText>
                    </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleModalClose} autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}
export default ActivityDetailDialog;