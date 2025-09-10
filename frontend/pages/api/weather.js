export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    // Simulate weather data - replace with actual weather API integration
    const weatherData = {
      temperature: 28,
      humidity: 65,
      conditions: 'Sunny',
      windSpeed: 12,
      rainfall: 0,
      forecast: [
        { day: 'Today', temp: 28, condition: 'Sunny' },
        { day: 'Tomorrow', temp: 26, condition: 'Partly Cloudy' },
        { day: 'Next Day', temp: 24, condition: 'Rainy' }
      ]
    };

    res.status(200).json({
      success: true,
      data: weatherData
    });

  } catch (error) {
    console.error('Weather API error:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}