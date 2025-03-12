// CityDataContext.js
import React, { createContext, useState } from 'react';

// יצירת ה-Context עבור הנתונים של העיר
const CityDataContext = createContext();

// יצירת ה-Provider
const CityDataProvider = ({ children }) => {
  const [cityData, setCityData] = useState(null);

  const setCityDataHandler = (data) => {
    setCityData(data);
  };

  return (
    <CityDataContext.Provider value={{ cityData, setCityDataHandler }}>
      {children}
    </CityDataContext.Provider>
  );
};

export { CityDataProvider, CityDataContext };
