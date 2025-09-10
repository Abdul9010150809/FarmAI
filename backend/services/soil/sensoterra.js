import axios from 'axios';
import { cache } from '../../utils/cache';

class SensoterraService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.sensoterra.com/v1';
  }

  async getSoilData(sensorId) {
    const cacheKey = `soil:sensoterra:${sensorId}`;
    
    try {
      const cached = await cache.get(cacheKey);
      if (cached) return JSON.parse(cached);

      const response = await axios.get(`${this.baseUrl}/sensors/${sensorId}/readings`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'application/json'
        },
        timeout: 10000
      });

      const data = this.processSoilData(response.data);
      
      await cache.set(cacheKey, JSON.stringify(data), 300); // 5 minutes cache
      
      return data;
    } catch (error) {
      console.error('Sensoterra API error:', error.message);
      throw new Error(`Soil data unavailable: ${error.message}`);
    }
  }

  processSoilData(rawData) {
    return {
      moisture: rawData.moisture,
      temperature: rawData.temperature,
      salinity: rawData.salinity,
      timestamp: rawData.timestamp,
      battery: rawData.battery_level
    };
  }

  async getSensorLocations() {
    try {
      const response = await axios.get(`${this.baseUrl}/sensors`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      return response.data.sensors;
    } catch (error) {
      throw new Error(`Failed to fetch sensor locations: ${error.message}`);
    }
  }
}

export default SensoterraService;