import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Supported languages
export const Languages = {
  ENGLISH: { code: 'en', name: 'English', native: 'English', dir: 'ltr' },
  HINDI: { code: 'hi', name: 'Hindi', native: 'हिन्दी', dir: 'ltr' },
  SPANISH: { code: 'es', name: 'Spanish', native: 'Español', dir: 'ltr' },
  FRENCH: { code: 'fr', name: 'French', native: 'Français', dir: 'ltr' },
  GERMAN: { code: 'de', name: 'German', native: 'Deutsch', dir: 'ltr' },
  PORTUGUESE: { code: 'pt', name: 'Portuguese', native: 'Português', dir: 'ltr' },
  CHINESE: { code: 'zh', name: 'Chinese', native: '中文', dir: 'ltr' },
  ARABIC: { code: 'ar', name: 'Arabic', native: 'العربية', dir: 'rtl' },
  // Add more languages as needed
};

// Language actions
const LanguageActions = {
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
};

// Initial state
const initialState = {
  currentLanguage: Languages.ENGLISH,
  availableLanguages: Object.values(Languages),
  isLoading: false,
  error: null
};

// Language reducer
const languageReducer = (state, action) => {
  switch (action.type) {
    case LanguageActions.SET_LANGUAGE:
      return {
        ...state,
        currentLanguage: action.payload,
        error: null
      };
    
    case LanguageActions.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    
    case LanguageActions.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    
    default:
      return state;
  }
};

// Create context
const LanguageContext = createContext();

// Language provider component
export const LanguageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(languageReducer, initialState);

  // Change language
  const changeLanguage = async (language) => {
    if (state.currentLanguage.code === language.code) return;
    
    dispatch({ type: LanguageActions.SET_LOADING, payload: true });
    
    try {
      // Simulate loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({ type: LanguageActions.SET_LANGUAGE, payload: language });
      
      // Update document direction and lang attribute
      document.documentElement.dir = language.dir;
      document.documentElement.lang = language.code;
      
      // Save preference to localStorage
      localStorage.setItem('preferredLanguage', language.code);
    } catch (error) {
      dispatch({ 
        type: LanguageActions.SET_ERROR, 
        payload: 'Failed to change language' 
      });
    } finally {
      dispatch({ type: LanguageActions.SET_LOADING, payload: false });
    }
  };

  // Initialize language on mount
  useEffect(() => {
    const initializeLanguage = async () => {
      // Get preferred language from localStorage or browser
      const savedLanguage = localStorage.getItem('preferredLanguage');
      const browserLanguage = navigator.language.split('-')[0];
      
      let initialLanguage = Languages.ENGLISH;
      
      if (savedLanguage) {
        const lang = Object.values(Languages).find(l => l.code === savedLanguage);
        if (lang) initialLanguage = lang;
      } else if (browserLanguage) {
        const lang = Object.values(Languages).find(l => l.code === browserLanguage);
        if (lang) initialLanguage = lang;
      }
      
      await changeLanguage(initialLanguage);
    };
    
    initializeLanguage();
  }, []);

  // Context value
  const value = {
    // State
    ...state,
    
    // Actions
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;