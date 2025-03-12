
import React, { useEffect, useState, useContext } from 'react';
import { CityContext } from "../context/CityContext"; // הקונטקסט של העיר
import { CityDataContext } from "../context/CityDataContext"; // הקונטקסט של נתוני העיר
import { getWeatherDetails } from "../api/weatherServices"; // הפונקציה לקריאת ה־API
import '../assets/styles/WeatherDisplay.css';

import moment from'moment-timezone';
import { formatDateTime } from './CityDetails';

const WeatherDisplay = () => {
    const { city } = useContext(CityContext); // גישה לעיר הנבחרת מתוך ה-Context
    const [error, setError] = useState(null);
    const { setCityDataHandler, cityData } = useContext(CityDataContext); // גישה לנתוני העיר
    let [weatherDetails, setWeatherDetails] = useState(null);
    let [celsiusByHour,setCelsiusByHour]=useState([]);


    useEffect(() => {
        if (city && !cityData) { // בודקים אם כבר יש נתונים
            getWeatherDetails(city)
                .then((res) => {
                    // עדכון הנתונים בקונטקסט
                    setCityDataHandler({
                        lat: res.data.location.lat,
                        lon: res.data.location.lon,
                        localtime: res.data.location.localtime,
                    });
    
                    setWeatherDetails(res.data);
                    
                    const currentTime = moment().tz(res.data.location.tz_id);
                    const currentHour = currentTime.hour();
                    const forecast = res.data.forecast.forecastday[0].hour;
    
                    setCelsiusByHour([
                        moment().tz(res.data.location.tz_id).subtract(2, 'hours').format("HH:mm"), forecast[currentHour - 2]?.temp_c ?? 'N/A',
                        moment().tz(res.data.location.tz_id).subtract(1, 'hours').format("HH:mm"), forecast[currentHour - 1]?.temp_c ?? 'N/A',
                        currentTime.format("HH:mm"), forecast[currentHour]?.temp_c ?? 'N/A',
                        moment().tz(res.data.location.tz_id).add(1, 'hours').format("HH:mm"), forecast[currentHour + 1]?.temp_c ?? 'N/A',
                        moment().tz(res.data.location.tz_id).add(2, 'hours').format("HH:mm"), forecast[currentHour + 2]?.temp_c ?? 'N/A'
                    ]);
                })
                .catch((err) => {
                    setError(err.message);
                });
        }
    }, [city]); 

    if (!cityData) {
        return (
            <div className="container-display">
                <div className="card">
                    <h1 className='thin'>Enter the city name to get the weather.</h1>
                </div>
            </div>

        )
    }

    return (
        <div className="container-display">
            <div className="card">  
                <p className='city'>{weatherDetails.location.name}</p>
                <p className='thin'>{weatherDetails.location.country}</p>
                <p className='thin'>{formatDateTime(weatherDetails.location.localtime)}</p>
                <p className='celsius'>{`${(weatherDetails.current.temp_c).toFixed(0)}°`}</p>
                <p className='city'>{weatherDetails.current.condition.text}</p>
                <div className="container-climate">
                        <h4>precipitation</h4>
                        <h4>humidity</h4>
                        <h4>wind</h4>
                        <p>{`${weatherDetails.current.precip_mm} mm`}</p>
                        <p>{`${weatherDetails.current.humidity}%`}</p>
                        <p>{`${weatherDetails.current.wind_kph} kph`}</p>
                        </div>
                        <div className="hour-climate">
                    <h5>{celsiusByHour[0]} </h5>
                    <h5>{celsiusByHour[2]} </h5>
                    <h5>{celsiusByHour[4]} </h5>
                    <h5>{celsiusByHour[6]} </h5>
                    <h5>{celsiusByHour[8]} </h5>
                    <p>{celsiusByHour[1].toFixed(0)}° </p>
                    <p>{celsiusByHour[3].toFixed(0)}° </p>
                    <p>{celsiusByHour[5].toFixed(0)}° </p>
                    <p>{celsiusByHour[9].toFixed(0)}° </p>
                    <p>{celsiusByHour[7].toFixed(0)}° </p>
                    
                </div>
            </div>
         </div>
    );
};

export default WeatherDisplay;
