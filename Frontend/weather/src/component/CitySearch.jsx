
import React, { useState, useContext } from 'react';
import { CityContext } from '../context/CityContext'; // הקונטקסט של העיר
import { CityDataContext } from '../context/CityDataContext'; // הקונטקסט של נתוני העיר
import '../assets/styles/CitySearch.css';
import CityDetalis from './CityDetails'; // הוספת CityDetalis

const CitySearch = () => {
  const [cityInput, setCityInput] = useState('');
  const { changeCity } = useContext(CityContext); // גישה ל-changeCity מה-Context

  const handleChange = (e) => {
    setCityInput(e.target.value);
  };

  const handleSearch = () => {
    changeCity(cityInput); // שינוי העיר לפי הקלט
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
          onChange={handleChange}
        />
        <input className="check" type="button" value="Check" onClick={handleSearch} />
      </div>

      {/* כאן אנחנו מציגים את CityDetalis אחרי ביצוע החיפוש */}
      <CityDetalis />
    </div>
  );
};

export default CitySearch;
