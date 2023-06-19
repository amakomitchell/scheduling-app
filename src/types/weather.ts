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

// export type Current = {
//   dt: number;
//   sunrise: number;
//   sunset: number;
//   temp: number;
//   feels_like: number;
//   pressure: number;
//   humidity: number;
//   dew_point: number;
//   uvi: number;
//   clouds: number;
//   visibility: number;
//   wind_speed: number;
//   wind_deg: number;
//   weather: WeatherElement[];
// };

export type WeatherElement = {
  id: number;
  main: string;
  description: string;
  icon: string;
};
