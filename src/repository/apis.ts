import { Activity } from '../types/activity';
import { Weather } from '../types/weather';
import { APPID } from './constants';

export type WeatherArgs = {
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

export const createActivity = async (activity: Activity): Promise<Activity> => {
  const response = await fetch('http://localhost:3030/activities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(activity),
  });
  const data = await response.json();
  return data;
};

export const editActivity = async (activity: Activity): Promise<Activity> => {
  const response = await fetch(`http://localhost:3030/activities/${activity.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(activity),
  });
  const data = await response.json();
  return data;
}

export const deleteActivity = async (activityId: string) => {
  return await fetch(`http://localhost:3030/activities/${activityId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}