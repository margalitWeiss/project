// CityContext.js
import React, { createContext, useState } from 'react';

// יצירת ה-Context
const CityContext = createContext();

// יצירת ה-Provider
const CityProvider = ({ children }) => {
  const [city, setCity] = useState(null);

  const changeCity = (cityName) => {
    setCity(cityName);
  };

  return (
    <CityContext.Provider value={{ city, changeCity }}>
      {children}
    </CityContext.Provider>
  );
};

export { CityProvider, CityContext };
