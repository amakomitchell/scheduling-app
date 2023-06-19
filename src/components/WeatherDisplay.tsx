import React, { useEffect, useState } from 'react';
import { useGetWeather } from '../repository/apis';
import { Weather } from '../types/weather';
import Box from '@mui/system/Box';

function WeatherDisplay() {
  const [coords, setCoords] = useState<GeolocationCoordinates | null>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords(position.coords);
    });
    
  }, []);

  const { data: weather, isLoading } = useGetWeather({ lat: coords?.latitude, lng: coords?.longitude });
  // console.log('weather', weather)
  return (
   <Box></Box>
  );
}
export default WeatherDisplay;
