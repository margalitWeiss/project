
import React, { createContext, useState } from 'react';


const CityContext = createContext();


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
