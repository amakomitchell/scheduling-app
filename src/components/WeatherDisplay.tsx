import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CloudIcon from '@mui/icons-material/Cloud';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { useGetWeather } from '../repository/queries';
import { convertKelvinToCelsius } from '../utils/get-celsius';
import Skeleton from '@mui/material/Skeleton';

function WeatherDisplay() {
  const [coords, setCoords] = useState<GeolocationCoordinates | null>();

  const { data: weather, isLoading } = useGetWeather({ lat: coords?.latitude, lng: coords?.longitude });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords(position.coords);
    });
    
  }, []);

  if(isLoading) {
    return (
      <Box ml={92} sx={{ width: 400}} mt={4}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
    </Box>
    )
  }
  if(!weather) {
    return null;
  }

  return (
    <Box display="flex" sx={{ width: '100%', flexDirection: { xs: 'row', md: 'row-reverse' } }} mt={4}>
      <Paper sx={{ width: { xs: '100%', md: '400px' } }}>
        <Box p={2} display="flex" flexDirection="column">
          <Typography> Current Weather</Typography>
          <Typography>{format(new Date(), 'hh:mm')}</Typography>
          <Box display="flex" gap={1}>
            <CloudIcon fontSize='large' />
            <Typography variant='h4'>{convertKelvinToCelsius(weather.main.temp)}&deg;C</Typography>
          </Box>
          <Typography>Humidity {(weather.main.humidity)}%</Typography>
        </Box>
       </Paper>
    </Box>
   
  );
}
export default WeatherDisplay;
