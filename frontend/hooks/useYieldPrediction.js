import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useYieldPrediction = (fieldId) => {
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, isAuthenticated } = useAuth();

  const fetchYieldPrediction = useCallback(async (id = fieldId) => {
    if (!isAuthenticated || !id) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/predictions/yield/field/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch yield prediction');
      }

      const data = await response.json();
      setPrediction(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Yield prediction fetch error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [fieldId, isAuthenticated, token]);

  const predictYield = useCallback(async (inputData) => {
    try {
      const response = await fetch('/api/predictions/yield', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
      });

      if (!response.ok) {
        throw new Error('Failed to predict yield');
      }

      return await response.json();
    } catch (err) {
      console.error('Yield prediction error:', err);
      return null;
    }
  }, [token]);

  const getYieldHistory = useCallback(async (years = 5) => {
    if (!fieldId) return;
    
    try {
      const response = await fetch(`/api/predictions/yield/field/${fieldId}/history?years=${years}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch yield history');
      }

      return await response.json();
    } catch (err) {
      console.error('Yield history fetch error:', err);
      return null;
    }
  }, [fieldId, token]);

  const getYieldComparison = useCallback(async (compareWith = 'regional') => {
    if (!fieldId || !prediction) return;
    
    try {
      const response = await fetch(`/api/predictions/yield/field/${fieldId}/compare?with=${compareWith}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch yield comparison');
      }

      return await response.json();
    } catch (err) {
      console.error('Yield comparison error:', err);
      return null;
    }
  }, [fieldId, prediction, token]);

  const getOptimizationRecommendations = useCallback(async () => {
    if (!fieldId || !prediction) return;
    
    try {
      const response = await fetch(`/api/predictions/yield/field/${fieldId}/optimize`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to get optimization recommendations');
      }

      return await response.json();
    } catch (err) {
      console.error('Optimization recommendations error:', err);
      return null;
    }
  }, [fieldId, prediction, token]);

  // Auto-fetch prediction when fieldId changes
  useEffect(() => {
    if (fieldId) {
      fetchYieldPrediction();
    }
  }, [fieldId, fetchYieldPrediction]);

  const refresh = () => {
    fetchYieldPrediction();
  };

  return {
    prediction,
    isLoading,
    error,
    refresh,
    predictYield,
    getYieldHistory,
    getYieldComparison,
    getOptimizationRecommendations,
    
    // Helper computed properties
    predictedYield: prediction?.predicted_yield,
    confidence: prediction?.confidence,
    predictedDate: prediction?.harvest_date,
    cropType: prediction?.crop_type,
    
    // Status flags
    hasPrediction: !!prediction,
    isAboveAverage: prediction?.comparison === 'above_average',
    isBelowAverage: prediction?.comparison === 'below_average',
    
    // Risk assessment
    riskLevel: prediction?.risk_level || 'medium',
    riskFactors: prediction?.risk_factors || [],
  };
};

// Hook for multiple field yield predictions
export const useBatchYieldPrediction = (fieldIds) => {
  const [predictions, setPredictions] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, isAuthenticated } = useAuth();

  const fetchBatchPredictions = useCallback(async (ids = fieldIds) => {
    if (!isAuthenticated || !ids.length) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/predictions/yield/batch', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ field_ids: ids })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch batch yield predictions');
      }

      const data = await response.json();
      setPredictions(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Batch yield prediction fetch error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [fieldIds, isAuthenticated, token]);

  useEffect(() => {
    if (fieldIds && fieldIds.length > 0) {
      fetchBatchPredictions();
    }
  }, [fieldIds, fetchBatchPredictions]);

  const refresh = () => {
    fetchBatchPredictions();
  };

  return {
    predictions,
    isLoading,
    error,
    refresh,
    
    // Helper computed properties
    totalPredictedYield: Object.values(predictions).reduce(
      (sum, pred) => sum + (pred.predicted_yield || 0), 0
    ),
    
    averageConfidence: Object.values(predictions).length ? 
      Object.values(predictions).reduce(
        (sum, pred) => sum + (pred.confidence || 0), 0
      ) / Object.values(predictions).length : 0,
  };
};