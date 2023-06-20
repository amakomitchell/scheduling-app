import React, { useEffect, useState } from 'react';
import { useGetWeather } from '../repository/apis';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CloudIcon from '@mui/icons-material/Cloud';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';

function WeatherDisplay() {
  const [coords, setCoords] = useState<GeolocationCoordinates | null>();

  const { data: weather, isLoading } = useGetWeather({ lat: coords?.latitude, lng: coords?.longitude });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords(position.coords);
    });
    
  }, []);

  const convertKelvinToCelsius = (kelvin: number) => {
    return Math.round(kelvin - 273.15);
  }

  if(isLoading) {
    return <div>Loading...</div>
  }
  if(!weather) {
    return <div>Not found</div>
  }
  
  console.log('weather', weather)
  return (
    <Box ml={90} sx={{ width: 400}} mt={4}>
      <Paper>
          <Box p={2} display="flex" flexDirection="column">
            <Typography> Current Weather</Typography>
            <Typography>{format(new Date(), 'hh:mm')}</Typography>
            <Box display="flex" gap={1}>
              <CloudIcon fontSize='large' />
              <Typography variant='h4'>{convertKelvinToCelsius(weather.main.temp)}&deg;C</Typography>
            </Box>
            <Typography>Humidity {(weather.main.humidity)}%</Typography>
          </Box>
          <Box>

          </Box>
       </Paper>
    </Box>
   
  );
}
export default WeatherDisplay;
