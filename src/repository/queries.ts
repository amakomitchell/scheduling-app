import { useQuery } from 'react-query';
import { WeatherArgs, getActivities, getWeather } from './apis';

export const useGetWeather = (coord: Pick<WeatherArgs, 'lat' | 'lng'>) => {
    return useQuery(['WEATHER'], () => getWeather(coord), {
      enabled: !!coord.lat && !!coord.lng,
    });
};
  
export const useGetActivities = () => {
    return useQuery(['ACTIVITIES'], getActivities);
};