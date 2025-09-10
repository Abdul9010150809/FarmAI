import axios from 'axios';

class GoogleAIService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
  }

  async predictYield(fieldData, weatherData, soilData) {
    const prompt = this.createYieldPredictionPrompt(fieldData, weatherData, soilData);
    
    try {
      const response = await axios.post(
        `${this.baseUrl}/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1024
          }
        },
        {
          timeout: 30000
        }
      );

      return this.parseAIResponse(response.data);
    } catch (error) {
      console.error('Google AI API error:', error.response?.data || error.message);
      throw new Error('Yield prediction service temporarily unavailable');
    }
  }

  createYieldPredictionPrompt(fieldData, weatherData, soilData) {
    return `
      As an agricultural AI expert, predict crop yield based on the following data:
      
      FIELD DATA:
      - Crop type: ${fieldData.cropType}
      - Area: ${fieldData.area} acres
      - Planting date: ${fieldData.plantingDate}
      - Location: ${fieldData.location}
      
      SOIL CONDITIONS:
      - pH: ${soilData.pH}
      - Nitrogen: ${soilData.nitrogen}%
      - Phosphorus: ${soilData.phosphorus}%
      - Potassium: ${soilData.potassium}%
      - Organic matter: ${soilData.organicMatter}%
      - Moisture: ${soilData.moisture}%
      
      WEATHER DATA:
      - Temperature: ${weatherData.temperature}°C
      - Humidity: ${weatherData.humidity}%
      - Rainfall: ${weatherData.rainfall}mm
      - Forecast: ${JSON.stringify(weatherData.forecast)}
      
      Provide a JSON response with:
      {
        "predictedYield": number (in tons),
        "confidence": number (0-100),
        "riskFactors": string[],
        "recommendations": string[],
        "optimalHarvestDate": "YYYY-MM-DD"
      }
    `;
  }

  parseAIResponse(response) {
    try {
      const text = response.candidates[0].content.parts[0].text;
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/{[\s\S]*}/);
      
      if (jsonMatch) {
        return JSON.parse(jsonMatch[1] || jsonMatch[0]);
      }
      
      throw new Error('Invalid AI response format');
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      throw new Error('Failed to process prediction results');
    }
  }

  async detectDisease(imageBuffer) {
    // Implementation for image-based disease detection
    // using Google's Vertex AI or similar service
  }
}

export default GoogleAIService;