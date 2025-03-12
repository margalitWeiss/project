import axios from "axios";
const baseUrl="http://localhost:5500/api/wether";

export const getWeatherDetails =(city)=>{
    return axios.get(baseUrl+"/"+city);
}
