import React, { useState, useContext } from 'react';
import { CityContext } from '../context/CityContext';
import { CityDataContext } from '../context/CityDataContext'; 
import '../assets/styles/CitySearch.css';
import CityDetalis from './CityDetails'; 

const CitySearch = () => {
  const [cityInput, setCityInput] = useState(''); // State to store user input
  const { changeCity } = useContext(CityContext); // Context to update the selected city

  const handleChange = (e) => {
    setCityInput(e.target.value); // Update the input state as the user types
  };

  const handleSearch = () => {
    changeCity(cityInput); // Call function to update the city in context
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // If Enter is pressed, call handleSearch
    }
  };

  return (
    <div className="container-search">
        <img src="src/assets/logo/e64a5185-e34a-4d45-977b-fea34b37d339.png" alt="logo" />
      <h1 className="title">Use our weather app to see the weather around the world</h1>
      <div className="form">
        <label className="label">City name</label>
        <input
          className="input"
          type="text"
          name="city"
          value={cityInput}
          onChange={handleChange} // Calls handleChange on user input
          onKeyDown={handleKeyDown} // Adds the event listener for Enter key press
        />
        <input className="check" type="button" value="Check" onClick={handleSearch} /> 
      </div>

      <CityDetalis />
    </div>
  );
};

export default CitySearch;
