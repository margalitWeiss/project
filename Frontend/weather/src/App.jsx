
import React from 'react';
import './App.css';
import CitySearch from './component/CitySearch';
import WeatherDisplay from './component/WeatherDisplay';
import { CityProvider } from './context/CityContext'; // הקונטקסט של העיר
import { CityDataProvider } from './context/CityDataContext'; // הקונטקסט של נתוני העיר

function App() {
  return (
    <CityProvider>
      <CityDataProvider>
        <div className="container">
          <CitySearch />
          <WeatherDisplay />
        </div>
      </CityDataProvider>
    </CityProvider>
  );
}

export default App;

