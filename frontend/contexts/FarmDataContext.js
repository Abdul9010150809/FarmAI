import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Farm data actions
const FarmActions = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_FARMS: 'SET_FARMS',
  SET_CURRENT_FARM: 'SET_CURRENT_FARM',
  UPDATE_FARM: 'UPDATE_FARM',
  ADD_FARM: 'ADD_FARM',
  SET_FIELD_DATA: 'SET_FIELD_DATA',
  SET_WEATHER_DATA: 'SET_WEATHER_DATA',
  SET_SOIL_DATA: 'SET_SOIL_DATA',
  SET_YIELD_PREDICTIONS: 'SET_YIELD_PREDICTIONS'
};

// Initial state
const initialState = {
  farms: [],
  currentFarm: null,
  fields: [],
  weatherData: {},
  soilData: {},
  yieldPredictions: {},
  isLoading: false,
  error: null,
  lastUpdated: null
};

// Farm data reducer
const farmDataReducer = (state, action) => {
  switch (action.type) {
    case FarmActions.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    
    case FarmActions.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    
    case FarmActions.SET_FARMS:
      return {
        ...state,
        farms: action.payload,
        isLoading: false,
        error: null
      };
    
    case FarmActions.SET_CURRENT_FARM:
      return {
        ...state,
        currentFarm: action.payload
      };
    
    case FarmActions.UPDATE_FARM:
      return {
        ...state,
        farms: state.farms.map(farm =>
          farm.id === action.payload.id ? { ...farm, ...action.payload } : farm
        ),
        currentFarm: state.currentFarm?.id === action.payload.id 
          ? { ...state.currentFarm, ...action.payload } 
          : state.currentFarm
      };
    
    case FarmActions.ADD_FARM:
      return {
        ...state,
        farms: [...state.farms, action.payload]
      };
    
    case FarmActions.SET_FIELD_DATA:
      return {
        ...state,
        fields: action.payload,
        lastUpdated: new Date().toISOString()
      };
    
    case FarmActions.SET_WEATHER_DATA:
      return {
        ...state,
        weatherData: {
          ...state.weatherData,
          [action.payload.farmId]: action.payload.data
        }
      };
    
    case FarmActions.SET_SOIL_DATA:
      return {
        ...state,
        soilData: {
          ...state.soilData,
          [action.payload.fieldId]: action.payload.data
        }
      };
    
    case FarmActions.SET_YIELD_PREDICTIONS:
      return {
        ...state,
        yieldPredictions: {
          ...state.yieldPredictions,
          [action.payload.fieldId]: action.payload.data
        }
      };
    
    default:
      return state;
  }
};

// Create context
const FarmDataContext = createContext();

// Farm data provider component
export const FarmDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(farmDataReducer, initialState);
  const { isAuthenticated, token } = useAuth();

  // Fetch farms data
  const fetchFarms = async () => {
    if (!isAuthenticated) return;
    
    try {
      dispatch({ type: FarmActions.SET_LOADING, payload: true });
      
      const response = await fetch('/api/farms', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch farms');
      }

      const farms = await response.json();
      dispatch({ type: FarmActions.SET_FARMS, payload: farms });
      
      // Set first farm as current if none selected
      if (farms.length > 0 && !state.currentFarm) {
        dispatch({ type: FarmActions.SET_CURRENT_FARM, payload: farms[0] });
      }
    } catch (error) {
      dispatch({ type: FarmActions.SET_ERROR, payload: error.message });
    }
  };

  // Fetch field data for current farm
  const fetchFieldData = async (farmId) => {
    if (!isAuthenticated || !farmId) return;
    
    try {
      const response = await fetch(`/api/farms/${farmId}/fields`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch field data');
      }

      const fields = await response.json();
      dispatch({ type: FarmActions.SET_FIELD_DATA, payload: fields });
    } catch (error) {
      console.error('Failed to fetch field data:', error);
    }
  };

  // Fetch weather data
  const fetchWeatherData = async (farmId) => {
    if (!isAuthenticated || !farmId) return;
    
    try {
      const response = await fetch(`/api/weather/farm/${farmId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const weatherData = await response.json();
      dispatch({
        type: FarmActions.SET_WEATHER_DATA,
        payload: { farmId, data: weatherData }
      });
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    }
  };

  // Fetch soil data for a field
  const fetchSoilData = async (fieldId) => {
    if (!isAuthenticated || !fieldId) return;
    
    try {
      const response = await fetch(`/api/soil/field/${fieldId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch soil data');
      }

      const soilData = await response.json();
      dispatch({
        type: FarmActions.SET_SOIL_DATA,
        payload: { fieldId, data: soilData }
      });
    } catch (error) {
      console.error('Failed to fetch soil data:', error);
    }
  };

  // Fetch yield predictions
  const fetchYieldPredictions = async (fieldId) => {
    if (!isAuthenticated || !fieldId) return;
    
    try {
      const response = await fetch(`/api/predictions/yield/field/${fieldId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch yield predictions');
      }

      const predictions = await response.json();
      dispatch({
        type: FarmActions.SET_YIELD_PREDICTIONS,
        payload: { fieldId, data: predictions }
      });
    } catch (error) {
      console.error('Failed to fetch yield predictions:', error);
    }
  };

  // Set current farm
  const setCurrentFarm = (farm) => {
    dispatch({ type: FarmActions.SET_CURRENT_FARM, payload: farm });
    fetchFieldData(farm.id);
    fetchWeatherData(farm.id);
  };

  // Add new farm
  const addFarm = async (farmData) => {
    try {
      const response = await fetch('/api/farms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(farmData),
      });

      if (!response.ok) {
        throw new Error('Failed to add farm');
      }

      const newFarm = await response.json();
      dispatch({ type: FarmActions.ADD_FARM, payload: newFarm });
      return { success: true, farm: newFarm };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Update farm
  const updateFarm = async (farmId, updates) => {
    try {
      const response = await fetch(`/api/farms/${farmId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update farm');
      }

      const updatedFarm = await response.json();
      dispatch({ type: FarmActions.UPDATE_FARM, payload: updatedFarm });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Refresh all data
  const refreshData = () => {
    if (state.currentFarm) {
      fetchFieldData(state.currentFarm.id);
      fetchWeatherData(state.currentFarm.id);
    }
  };

  // Load data on auth and farm change
  useEffect(() => {
    if (isAuthenticated) {
      fetchFarms();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (state.currentFarm) {
      fetchFieldData(state.currentFarm.id);
      fetchWeatherData(state.currentFarm.id);
    }
  }, [state.currentFarm]);

  // Context value
  const value = {
    // State
    ...state,
    
    // Actions
    setCurrentFarm,
    addFarm,
    updateFarm,
    fetchSoilData,
    fetchYieldPredictions,
    refreshData,
    
    // Helper getters
    currentFarmFields: state.fields.filter(field => 
      field.farmId === state.currentFarm?.id
    ),
    currentWeather: state.weatherData[state.currentFarm?.id] || {},
    getFieldSoilData: (fieldId) => state.soilData[fieldId] || null,
    getFieldYieldPrediction: (fieldId) => state.yieldPredictions[fieldId] || null
  };

  return (
    <FarmDataContext.Provider value={value}>
      {children}
    </FarmDataContext.Provider>
  );
};

// Custom hook to use farm data context
export const useFarmData = () => {
  const context = useContext(FarmDataContext);
  if (!context) {
    throw new Error('useFarmData must be used within a FarmDataProvider');
  }
  return context;
};

export default FarmDataContext;