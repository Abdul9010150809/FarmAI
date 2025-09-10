import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useWeather = (farmId) => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, isAuthenticated } = useAuth();

  const fetchWeatherData = useCallback(async (id = farmId) => {
    if (!isAuthenticated || !id) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/weather/farm/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeatherData(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Weather data fetch error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [farmId, isAuthenticated, token]);

  const getWeatherForecast = useCallback(async (days = 7) => {
    if (!farmId) return;
    
    try {
      const response = await fetch(`/api/weather/farm/${farmId}/forecast?days=${days}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch weather forecast');
      }

      return await response.json();
    } catch (err) {
      console.error('Weather forecast fetch error:', err);
      return null;
    }
  }, [farmId, token]);

  const getWeatherAlerts = useCallback(async () => {
    if (!farmId) return;
    
    try {
      const response = await fetch(`/api/weather/farm/${farmId}/alerts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch weather alerts');
      }

      return await response.json();
    } catch (err) {
      console.error('Weather alerts fetch error:', err);
      return null;
    }
  }, [farmId, token]);

  const getIrrigationRecommendation = useCallback(async () => {
    if (!farmId || !weatherData) return;
    
    try {
      const response = await fetch(`/api/weather/farm/${farmId}/irrigation`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ currentWeather: weatherData })
      });

      if (!response.ok) {
        throw new Error('Failed to get irrigation recommendation');
      }

      return await response.json();
    } catch (err) {
      console.error('Irrigation recommendation error:', err);
      return null;
    }
  }, [farmId, weatherData, token]);

  // Auto-fetch weather data when farmId changes
  useEffect(() => {
    if (farmId) {
      fetchWeatherData();
    }
  }, [farmId, fetchWeatherData]);

  // Refresh function
  const refresh = () => {
    fetchWeatherData();
  };

  return {
    weatherData,
    isLoading,
    error,
    refresh,
    getWeatherForecast,
    getWeatherAlerts,
    getIrrigationRecommendation,
    
    // Helper computed properties
    currentTemperature: weatherData?.current?.temp,
    currentConditions: weatherData?.current?.condition,
    humidity: weatherData?.current?.humidity,
    windSpeed: weatherData?.current?.wind_speed,
    rainfall: weatherData?.current?.rainfall,
    
    // Status flags
    hasData: !!weatherData,
    isRaining: weatherData?.current?.condition?.toLowerCase().includes('rain'),
    isSunny: weatherData?.current?.condition?.toLowerCase().includes('sunny'),
    isCloudy: weatherData?.current?.condition?.toLowerCase().includes('cloud'),
  };
};

// Hook for weather history
export const useWeatherHistory = (farmId, days = 30) => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, isAuthenticated } = useAuth();

  const fetchWeatherHistory = useCallback(async () => {
    if (!isAuthenticated || !farmId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/weather/farm/${farmId}/history?days=${days}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch weather history');
      }

      const data = await response.json();
      setHistory(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Weather history fetch error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [farmId, days, isAuthenticated, token]);

  useEffect(() => {
    if (farmId) {
      fetchWeatherHistory();
    }
  }, [farmId, fetchWeatherHistory]);

  return {
    history,
    isLoading,
    error,
    refresh: fetchWeatherHistory,
    
    // Analysis helpers
    averageTemperature: history.length ? 
      history.reduce((sum, day) => sum + day.avg_temp, 0) / history.length : 0,
    
    totalRainfall: history.reduce((sum, day) => sum + (day.rainfall || 0), 0),
    
    rainyDays: history.filter(day => day.rainfall > 0).length,
  };
};