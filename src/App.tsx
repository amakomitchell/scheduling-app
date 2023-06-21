import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ActivityList from './components/ActivityList';
import WeatherDisplay from './components/WeatherDisplay';
import { Container, ThemeProvider, createTheme } from '@mui/material';

export const queryClient = new QueryClient();

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 900,
      lg: 1080,
      xl: 1536,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Container>
          <WeatherDisplay />
          <ActivityList /> 
        </Container>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
