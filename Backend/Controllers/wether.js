import axios from "axios";

export const getWeather = async (req, res) => {
  try {
    const city = req.params.city; // Get the city parameter from the request
    if (!city) {
      return res.status(400).json({ title: "Error", message: "Invalid city name" });
    }

    // Make a request to the Weather API using the city parameter
    const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city}&hours=24`);

    if (!response || !response.data) {
      return res.status(400).json({ title: "Error", message: `No weather data found for ${city}` });
    }

    res.json(response.data); // Send the weather data as a response

  } catch (error) {
    console.error('Error fetching weather data:', error);
    return res.status(500).json({
      title: "Error",
      message: "An error occurred while fetching weather data"
    });
  }
};
