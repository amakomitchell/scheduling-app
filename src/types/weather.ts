export type Weather = {
  id: number;
  name: string;
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  main: Main;
};

export type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
};
