import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ActivityList from './components/ActivityList';
import WeatherDisplay from './components/WeatherDisplay';
import { Container } from '@mui/material';

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <WeatherDisplay />
        <ActivityList /> 
      </Container>
    </QueryClientProvider>
  );
}

export default App;
