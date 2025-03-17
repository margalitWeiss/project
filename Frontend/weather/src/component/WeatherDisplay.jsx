import React, { useEffect, useState, useContext } from 'react';
import { CityContext } from "../context/CityContext"; 
import { CityDataContext } from "../context/CityDataContext"; 
import { getWeatherDetails } from "../api/weatherServices"; 
import '../assets/styles/WeatherDisplay.css';
import moment from 'moment-timezone';
import { formatDateTime } from './CityDetails';

const WeatherDisplay = () => {
    const { city } = useContext(CityContext); // Retrieve selected city from context
    const [error, setError] = useState(null);
    const { setCityDataHandler, cityData } = useContext(CityDataContext); // Retrieve city data from context
    let [weatherDetails, setWeatherDetails] = useState(null);
    let [celsiusByHour, setCelsiusByHour] = useState([]);

    useEffect(() => {
        if (city) { // Fetch weather data only if city is selected and data is not available
            getWeatherDetails(city)
                .then((res) => {
                    setCityDataHandler({
                        lat: res.data.location.lat,
                        lon: res.data.location.lon,
                        localtime: res.data.location.localtime,
                    });

                    setWeatherDetails(res.data);
                    
                    const currentTime = moment().tz(res.data.location.tz_id);
                    const currentHour = currentTime.hour();
                    const forecast = res.data.forecast.forecastday[0].hour;

                    // Store temperatures from 2 hours ago to 2 hours in the future
                    setCelsiusByHour([
                        {time: moment().tz(res.data.location.tz_id).subtract(2, 'hours').format("HH:mm"), temp: forecast[currentHour - 2]?.temp_c ?? 'N/A'},
                        {time: moment().tz(res.data.location.tz_id).subtract(1, 'hours').format("HH:mm"), temp: forecast[currentHour - 1]?.temp_c ?? 'N/A'},
                        {time: currentTime.format("HH:mm"), temp: forecast[currentHour]?.temp_c ?? 'N/A'},
                        {time: moment().tz(res.data.location.tz_id).add(1, 'hours').format("HH:mm"), temp: forecast[currentHour + 1]?.temp_c ?? 'N/A'},
                        {time: moment().tz(res.data.location.tz_id).add(2, 'hours').format("HH:mm"), temp: forecast[currentHour + 2]?.temp_c ?? 'N/A'}
                    ]);
                })
                .catch((err) => {
                    setError(err.message);
                });
        }
    }, [city]); // Dependency array ensures this runs when city changes

    if (!cityData) {
        return (
            <div className="container-display">
                <div className="card">
                    <h1 className='thin'>Enter the city name to get the weather.</h1>
                </div>
            </div>
        );
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
                    <h4>Precipitation</h4>
                    <h4>Humidity</h4>
                    <h4>Wind</h4>
                    <p>{`${weatherDetails.current.precip_mm} mm`}</p>
                    <p>{`${weatherDetails.current.humidity}%`}</p>
                    <p>{`${weatherDetails.current.wind_kph} kph`}</p>
                </div>
                <div className="hour-climate">
                    {celsiusByHour.map((hourData, index) => (
                        <div key={index}>
                            <h5>{hourData.time}</h5>
                            <p>{hourData.temp !== 'N/A' ? `${hourData.temp.toFixed(0)}°` : 'N/A'}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;
