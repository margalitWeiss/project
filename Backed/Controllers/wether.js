
import axios from "axios";

export const getWeather = async (req, res) => {
  try {
    const city = req.params.city;
    if (!city) {
      return res.status(400).json({ title: "שגיאה", message: "העיר לא חוקית" });
    }

    
    const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city}&hours=24`);

    if (!response || !response.data) {
      return res.status(400).json({ title: "שגיאה", message: `לא נמצאו נתוני מזג אוויר עבור העיר ${city}` });
    }

    res.json(response.data);

  } catch (error) {
    console.error('שגיאה בקבלת נתוני מזג האוויר:', error);
    return res.status(500).json({
      title: "שגיאה",
      message: "אירעה שגיאה במהלך קבלת נתוני מזג האוויר"
    });
  }
};
