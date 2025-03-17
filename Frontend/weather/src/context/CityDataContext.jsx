
import React, { createContext, useState } from 'react';


const CityDataContext = createContext();


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
