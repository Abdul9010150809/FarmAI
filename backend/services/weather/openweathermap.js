import axios from 'axios';
import { cache } from '../../utils/cache';
import { handleApiError } from '../../utils/error-handler';

class OpenWeatherMapService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
    this.cache = cache;
  }

  async getCurrentWeather(lat, lon) {
    const cacheKey = `weather:current:${lat}:${lon}`;
    
    try {
      // Check cache first
      const cached = await this.cache.get(cacheKey);
      if (cached) return JSON.parse(cached);

      const response = await axios.get(`${this.baseUrl}/weather`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric'
        },
        timeout: 5000
      });

      const data = response.data;
      
      // Cache for 10 minutes
      await this.cache.set(cacheKey, JSON.stringify(data), 600);
      
      return data;
    } catch (error) {
      throw handleApiError(error, 'OpenWeatherMap');
    }
  }

  async getForecast(lat, lon, days = 7) {
    const cacheKey = `weather:forecast:${lat}:${lon}:${days}`;
    
    try {
      const cached = await this.cache.get(cacheKey);
      if (cached) return JSON.parse(cached);

      const response = await axios.get(`${this.baseUrl}/forecast`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric',
          cnt: days * 8 // 3-hour intervals
        }
      });

      const data = this.formatForecast(response.data, days);
      
      await this.cache.set(cacheKey, JSON.stringify(data), 3600); // 1 hour cache
      
      return data;
    } catch (error) {
      throw handleApiError(error, 'OpenWeatherMap');
    }
  }

  formatForecast(data, days) {
    // Process and format forecast data
    return {
      current: data.list[0],
      daily: data.list.slice(0, days),
      location: data.city
    };
  }
}

export default OpenWeatherMapService;