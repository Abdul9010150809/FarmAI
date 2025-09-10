import express from 'express';
import { OpenWeatherMapService } from '../services/weather/openweathermap.js';
import { WeatherstackService } from '../services/weather/weatherstack.js';
import { validateCoordinates } from '../utils/validation.js';

const router = express.Router();
const weatherServices = {
  openweather: new OpenWeatherMapService(process.env.OPENWEATHER_API_KEY),
  weatherstack: new WeatherstackService(process.env.WEATHERSTACK_API_KEY)
};

// Get current weather
router.get('/current/:lat/:lon', async (req, res) => {
  try {
    const { lat, lon } = req.params;
    
    // Validate coordinates
    const validation = validateCoordinates(parseFloat(lat), parseFloat(lon));
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    // Try primary service, fallback to secondary
    let data;
    try {
      data = await weatherServices.openweather.getCurrentWeather(lat, lon);
    } catch (primaryError) {
      console.warn('Primary weather service failed, trying fallback:', primaryError.message);
      data = await weatherServices.weatherstack.getCurrentWeather(lat, lon);
    }

    res.json({
      success: true,
      data: {
        temperature: data.main.temp,
        humidity: data.main.humidity,
        conditions: data.weather[0].description,
        windSpeed: data.wind.speed,
        rainfall: data.rain ? data.rain['1h'] || 0 : 0,
        location: data.name
      }
    });
  } catch (error) {
    console.error('Weather API error:', error);
    res.status(503).json({
      success: false,
      error: 'Weather service temporarily unavailable'
    });
  }
});

// Get weather forecast
router.get('/forecast/:lat/:lon/:days?', async (req, res) => {
  try {
    const { lat, lon, days = 7 } = req.params;
    const forecast = await weatherServices.openweather.getForecast(lat, lon, parseInt(days));
    
    res.json({
      success: true,
      data: forecast
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get weather alerts
router.get('/alerts/:lat/:lon', async (req, res) => {
  try {
    const { lat, lon } = req.params;
    const alerts = await weatherServices.openweather.getAlerts(lat, lon);
    
    res.json({
      success: true,
      data: alerts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;