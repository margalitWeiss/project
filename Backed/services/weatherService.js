import axios from "axios";
const baseUrl=`http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}`;

export  const  getWeatherByCity = async(city)=>{
    return await axios.get(baseUrl+`&q=${city}&hours=24`);
}

