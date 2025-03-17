
import React, { useContext } from 'react';
import { CityDataContext } from '../context/CityDataContext';
import '../assets/styles/CityDetails.css'


export const formatDateTime = (dateString) => {
  const date = new Date(dateString); 

  const formattedDate = date.toISOString().split('T')[0].replace(/-/g, '/'); 
  const formattedTime = date.toTimeString().split(' ')[0].slice(0, 5); 

  return `${formattedDate} at ${formattedTime}`;
};

const CityDetalis = () => {
  const { cityData } = useContext(CityDataContext); 

  if (!cityData) {
    return <p className='thirdP city-details'>Loading...</p>;
  }

  return (
    <div className='city-details'>
      <p className='firstP'>{`latitude ${cityData.lat}`}</p>
      <p className='secondP'>{`longitude ${cityData.lon}`}</p>
      <p className='thirdP'>{`accurate to ${formatDateTime(cityData.localtime)}`}</p>
    </div>
  );
};

export default CityDetalis;


