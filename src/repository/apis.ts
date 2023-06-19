import { useQuery } from 'react-query';
import { Activity } from '../types/activity';
import { Weather } from '../types/weather';
import { APPID } from './constants';

type WeatherArgs = {
  lng?: number;
  lat?: number;
  location?: string;
  date?: string;
};

export const getWeather = async (arg: WeatherArgs): Promise<Weather> => {
  const locationQuery = arg.location
    ? `q=${arg.location}`
    : `lat=${arg.lat}&lon=${arg.lng}`;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${locationQuery}&APPID=${APPID}`
  );
  const data = await response.json();
  return data;
};

export const getActivities = async (): Promise<Activity[]> => {
  const response = await fetch('http://localhost:3030/activities');
  const activities = await response.json();
  return activities;
};

export const useGetWeather = (coord: Pick<WeatherArgs, 'lat' | 'lng'>) => {
  return useQuery(['WEATHER'], () => getWeather(coord), {
    enabled: !!coord.lat && !!coord.lng,
  });
};

export const useGetActivities = () => {
  return useQuery(['ACTIVITIES'], getActivities);
};

// http://api.openweathermap.org/geo/1.0/reverse?lat=${LAT}&lon=${LON}&APPID=${APPID}
// https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${APPID}
