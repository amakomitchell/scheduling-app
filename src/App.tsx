import React from 'react';
import mockData from './data.json';
import ActivityList from './components/ActivityList';
// import './App.css';

function App() {
  // console.log('mockData', mockData);
  return (
    <div>
      Activity List
      <ActivityList />
    </div>
  );
}

export default App;
