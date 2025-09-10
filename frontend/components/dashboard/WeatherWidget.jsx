import React from 'react';
import Card from '../ui/Card';

const WeatherWidget = ({ weatherData }) => {
  const weather = weatherData || {
    temperature: 28,
    condition: 'Sunny',
    humidity: 65,
    windSpeed: 12,
    rainfall: 0,
    forecast: [
      { day: 'Today', temp: 28, condition: 'Sunny' },
      { day: 'Tomorrow', temp: 26, condition: 'Partly Cloudy' },
      { day: 'Wed', temp: 24, condition: 'Rainy' }
    ]
  };

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return '☀️';
      case 'cloudy': return '☁️';
      case 'rainy': return '🌧️';
      case 'partly cloudy': return '⛅';
      default: return '🌤️';
    }
  };

  return (
    <Card title="Weather Forecast" className="p-6">
      <div className="text-center mb-4">
        <div className="text-4xl mb-2">{getWeatherIcon(weather.condition)}</div>
        <div className="text-3xl font-bold text-gray-800">{weather.temperature}°C</div>
        <div className="text-gray-600">{weather.condition}</div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center p-2 bg-gray-50 rounded">
          <div className="text-sm text-gray-600">Humidity</div>
          <div className="font-semibold">{weather.humidity}%</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded">
          <div className="text-sm text-gray-600">Wind</div>
          <div className="font-semibold">{weather.windSpeed} km/h</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded">
          <div className="text-sm text-gray-600">Rainfall</div>
          <div className="font-semibold">{weather.rainfall} mm</div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-semibold mb-2">3-Day Forecast</h4>
        <div className="grid grid-cols-3 gap-2">
          {weather.forecast.map((day, index) => (
            <div key={index} className="text-center p-2 bg-blue-50 rounded">
              <div className="text-sm font-medium">{day.day}</div>
              <div className="text-2xl">{getWeatherIcon(day.condition)}</div>
              <div className="text-sm">{day.temp}°C</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default WeatherWidget;