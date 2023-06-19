import React, { useEffect, useState } from 'react';
import { getWeather } from '../repository/get-weather';
import { Weather } from '../types/weather';

function WeatherDisplay() {
  const [activities, setActivities] = useState<Weather>();

  useEffect(() => {
    getWeather().then((data) => {
      setActivities(data);
    });
  }, []);

  console.log('weather activities', activities);
  return (
    <div className="App">
      <h1>Weather Activities</h1>
      <div>Name: {activities?.name}</div>
      <div>Temperature: {activities?.main.temp}</div>
      {/* <ul>
            {activities.map((activity) => (
              <li key={activity.id}>
                {activity.name} - {activity.timezone}
              </li>
            ))}
          </ul> */}
    </div>
  );
}
export default WeatherDisplay;
