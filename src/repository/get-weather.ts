import { Weather } from '../types/weather';
import { APPID, LAT, LON } from './constants';

export const getWeather = async (): Promise<Weather> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Berlin,de&APPID=${APPID}`
  );
  const data = await response.json();
  return data;
};

// http://api.openweathermap.org/geo/1.0/reverse?lat=${LAT}&lon=${LON}&APPID=${APPID}
// https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${APPID}
