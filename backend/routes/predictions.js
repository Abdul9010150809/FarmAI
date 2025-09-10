import express from 'express';
import { GoogleAIService } from '../services/ai-ml/google-ai.js';
import { AzureMLService } from '../services/ai-ml/azure-ml.js';
import { cache } from '../utils/cache.js';

const router = express.Router();
const aiService = new GoogleAIService(process.env.GOOGLE_AI_API_KEY);
const mlService = new AzureMLService(process.env.AZURE_ML_ENDPOINT);

// Predict yield for a field
router.post('/yield', async (req, res) => {
  try {
    const { fieldData, weatherData, soilData } = req.body;
    
    // Validate input data
    if (!fieldData || !weatherData || !soilData) {
      return res.status(400).json({
        success: false,
        error: 'Missing required data: fieldData, weatherData, soilData'
      });
    }

    const cacheKey = `prediction:yield:${fieldData.fieldId}:${new Date().toISOString().split('T')[0]}`;
    
    // Check cache
    const cached = await cache.get(cacheKey);
    if (cached) {
      return res.json({
        success: true,
        data: JSON.parse(cached),
        cached: true
      });
    }

    // Get prediction from AI service
    const prediction = await aiService.predictYield(fieldData, weatherData, soilData);
    
    // Cache prediction for 24 hours
    await cache.set(cacheKey, JSON.stringify(prediction), 86400);
    
    res.json({
      success: true,
      data: prediction,
      cached: false
    });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get disease detection from image
router.post('/disease-detection', async (req, res) => {
  try {
    const { imageBase64 } = req.body;
    
    if (!imageBase64) {
      return res.status(400).json({
        success: false,
        error: 'Image data is required'
      });
    }

    const detection = await aiService.detectDisease(imageBase64);
    
    res.json({
      success: true,
      data: detection
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get optimization recommendations
router.post('/optimize', async (req, res) => {
  try {
    const { currentYield, targetYield, constraints } = req.body;
    
    const recommendations = await mlService.getOptimizationRecommendations(
      currentYield,
      targetYield,
      constraints
    );
    
    res.json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;