import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useSoilData = (fieldId) => {
  const [soilData, setSoilData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, isAuthenticated } = useAuth();

  const fetchSoilData = useCallback(async (id = fieldId) => {
    if (!isAuthenticated || !id) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/soil/field/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch soil data');
      }

      const data = await response.json();
      setSoilData(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Soil data fetch error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [fieldId, isAuthenticated, token]);

  const updateSoilData = useCallback(async (updates) => {
    if (!fieldId) return;
    
    try {
      const response = await fetch(`/api/soil/field/${fieldId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        throw new Error('Failed to update soil data');
      }

      const updatedData = await response.json();
      setSoilData(updatedData);
      return updatedData;
    } catch (err) {
      console.error('Soil data update error:', err);
      return null;
    }
  }, [fieldId, token]);

  const getFertilizerRecommendation = useCallback(async () => {
    if (!fieldId || !soilData) return;
    
    try {
      const response = await fetch(`/api/soil/field/${fieldId}/fertilizer`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to get fertilizer recommendation');
      }

      return await response.json();
    } catch (err) {
      console.error('Fertilizer recommendation error:', err);
      return null;
    }
  }, [fieldId, soilData, token]);

  const getSoilHealthScore = useCallback(() => {
    if (!soilData) return 0;
    
    const { pH, nitrogen, phosphorus, potassium, organic_matter, moisture } = soilData;
    
    // Simple scoring algorithm (can be enhanced)
    let score = 0;
    
    // pH score (optimal: 6.0-7.0)
    if (pH >= 6.0 && pH <= 7.0) score += 25;
    else if (pH >= 5.5 && pH <= 7.5) score += 15;
    else score += 5;

    // Nutrient scores
    if (nitrogen >= 40 && nitrogen <= 60) score += 20;
    else if (nitrogen >= 30 && nitrogen <= 70) score += 10;

    if (phosphorus >= 30 && phosphorus <= 50) score += 20;
    else if (phosphorus >= 20 && phosphorus <= 60) score += 10;

    if (potassium >= 40 && potassium <= 60) score += 20;
    else if (potassium >= 30 && potassium <= 70) score += 10;

    // Organic matter and moisture
    if (organic_matter >= 2.0) score += 10;
    if (moisture >= 50 && moisture <= 70) score += 5;

    return Math.min(100, score);
  }, [soilData]);

  // Auto-fetch soil data when fieldId changes
  useEffect(() => {
    if (fieldId) {
      fetchSoilData();
    }
  }, [fieldId, fetchSoilData]);

  const refresh = () => {
    fetchSoilData();
  };

  return {
    soilData,
    isLoading,
    error,
    refresh,
    updateSoilData,
    getFertilizerRecommendation,
    getSoilHealthScore,
    
    // Helper computed properties
    pH: soilData?.pH,
    nitrogen: soilData?.nitrogen,
    phosphorus: soilData?.phosphorus,
    potassium: soilData?.potassium,
    organicMatter: soilData?.organic_matter,
    moisture: soilData?.moisture,
    temperature: soilData?.temperature,
    
    // Status flags
    hasData: !!soilData,
    needsFertilizer: soilData ? 
      (soilData.nitrogen < 40 || soilData.phosphorus < 30 || soilData.potassium < 40) : false,
    
    pHStatus: soilData ? 
      (soilData.pH >= 6.0 && soilData.pH <= 7.0) ? 'optimal' :
      (soilData.pH >= 5.5 && soilData.pH <= 7.5) ? 'acceptable' : 'needs_adjustment'
      : 'unknown',
  };
};

// Hook for soil history
export const useSoilHistory = (fieldId, months = 12) => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token, isAuthenticated } = useAuth();

  const fetchSoilHistory = useCallback(async () => {
    if (!isAuthenticated || !fieldId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/soil/field/${fieldId}/history?months=${months}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch soil history');
      }

      const data = await response.json();
      setHistory(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Soil history fetch error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [fieldId, months, isAuthenticated, token]);

  useEffect(() => {
    if (fieldId) {
      fetchSoilHistory();
    }
  }, [fieldId, fetchSoilHistory]);

  return {
    history,
    isLoading,
    error,
    refresh: fetchSoilHistory,
    
    // Analysis helpers
    pHTrend: history.length >= 2 ? 
      history[history.length - 1].pH - history[0].pH : 0,
    
    nutrientTrend: history.length >= 2 ? {
      nitrogen: history[history.length - 1].nitrogen - history[0].nitrogen,
      phosphorus: history[history.length - 1].phosphorus - history[0].phosphorus,
      potassium: history[history.length - 1].potassium - history[0].potassium,
    } : { nitrogen: 0, phosphorus: 0, potassium: 0 },
  };
};