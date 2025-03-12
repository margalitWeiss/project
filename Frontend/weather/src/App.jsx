// import { useState } from 'react'
// import './style/App.css'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import CitySearch from './component/CitySearch'
// import WeatherDisplay from './component/WeatherDisplay'
// import N from './component/n'


// function App() {
//   let [city,setCity]=useState(null)
//   const changeCity=(city)=>{
//     debugger;
//     setCity(city)
//   }
//   return (
//     <div className='container'>
//      <CitySearch changeCity={changeCity}/>
//      <WeatherDisplay city={city}/>
//      </div>
   
//   )
// }

// export default App

// App.js
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

