
import React, { useContext } from 'react';
import { CityDataContext } from '../context/CityDataContext'; // הקונטקסט של נתוני העיר
import '../assets/styles/CityDetails.css'

// פונקציה להמיר את התאריך לפורמט הרצוי
export const formatDateTime = (dateString) => {
  const date = new Date(dateString); // ממיר את ה-String לאובייקט תאריך

  const formattedDate = date.toISOString().split('T')[0].replace(/-/g, '/'); // מקבל את התאריך (yyyy/mm/dd)
  const formattedTime = date.toTimeString().split(' ')[0].slice(0, 5); // מקבל את השעה בפורמט hh:mm

  return `${formattedDate} at ${formattedTime}`;
};

const CityDetalis = () => {
  const { cityData } = useContext(CityDataContext); // גישה לנתונים מה-Context

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


