import { useCallback, useState, useEffect } from 'react';
import { useLanguage as useLanguageContext } from '../contexts/LanguageContext';

// Google Translate API service
class GoogleTranslateService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://translation.googleapis.com/language/translate/v2';
    this.cache = new Map();
  }

  async translate(text, targetLanguage, sourceLanguage = 'en') {
    if (!this.apiKey) {
      console.warn('Google Translate API key not configured');
      return text;
    }

    // Check cache first
    const cacheKey = `${sourceLanguage}-${targetLanguage}-${text}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLanguage,
          source: sourceLanguage,
          format: 'text'
        }),
      });

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.status}`);
      }

      const data = await response.json();
      const translatedText = data.data.translations[0].translatedText;
      
      // Cache the result
      this.cache.set(cacheKey, translatedText);
      
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Fallback to original text
    }
  }

  async translateObject(obj, targetLanguage, sourceLanguage = 'en') {
    const translated = {};
    
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        translated[key] = await this.translate(value, targetLanguage, sourceLanguage);
      } else if (typeof value === 'object' && value !== null) {
        translated[key] = await this.translateObject(value, targetLanguage, sourceLanguage);
      } else {
        translated[key] = value;
      }
    }
    
    return translated;
  }

  clearCache() {
    this.cache.clear();
  }
}

// Create singleton instance
const translateService = new GoogleTranslateService(process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY);

export const useLanguage = () => {
  const context = useLanguageContext();
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationCache, setTranslationCache] = useState(new Map());

  // Enhanced translation function with Google Translate
  const t = useCallback(async (key, params = {}, fallback = null) => {
    const originalText = fallback || key;
    
    // If already in English or no language change, return original
    if (context.currentLanguage.code === 'en') {
      return replaceParams(originalText, params);
    }

    // Check cache first
    const cacheKey = `${context.currentLanguage.code}-${originalText}`;
    if (translationCache.has(cacheKey)) {
      return replaceParams(translationCache.get(cacheKey), params);
    }

    setIsTranslating(true);
    
    try {
      const translatedText = await translateService.translate(
        originalText, 
        context.currentLanguage.code
      );
      
      // Update cache
      setTranslationCache(prev => new Map(prev).set(cacheKey, translatedText));
      
      return replaceParams(translatedText, params);
    } catch (error) {
      console.error('Translation failed:', error);
      return replaceParams(originalText, params);
    } finally {
      setIsTranslating(false);
    }
  }, [context.currentLanguage.code, translationCache]);

  // Batch translation for better performance
  const translateBatch = useCallback(async (texts) => {
    if (context.currentLanguage.code === 'en') {
      return texts;
    }

    setIsTranslating(true);
    
    try {
      const results = await Promise.all(
        texts.map(text => 
          translateService.translate(text, context.currentLanguage.code)
        )
      );
      
      // Update cache
      const newCache = new Map(translationCache);
      texts.forEach((text, index) => {
        newCache.set(`${context.currentLanguage.code}-${text}`, results[index]);
      });
      setTranslationCache(newCache);
      
      return results;
    } catch (error) {
      console.error('Batch translation failed:', error);
      return texts;
    } finally {
      setIsTranslating(false);
    }
  }, [context.currentLanguage.code, translationCache]);

  // Helper function to replace parameters in translated text
  const replaceParams = (text, params) => {
    return Object.entries(params).reduce((result, [key, value]) => {
      return result.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }, text);
  };

  // Currency formatting
  const formatCurrency = useCallback((amount, currency = 'INR') => {
    return new Intl.NumberFormat(context.currentLanguage.code, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }, [context.currentLanguage.code]);

  // Date formatting
  const formatDate = useCallback((date, options = {}) => {
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    
    return new Intl.DateTimeFormat(
      context.currentLanguage.code, 
      { ...defaultOptions, ...options }
    ).format(new Date(date));
  }, [context.currentLanguage.code]);

  // Number formatting
  const formatNumber = useCallback((number, options = {}) => {
    return new Intl.NumberFormat(
      context.currentLanguage.code, 
      options
    ).format(number);
  }, [context.currentLanguage.code]);

  // Voice translation with enhanced options
  const speak = useCallback(async (text, options = {}) => {
    const {
      rate = 0.8,
      pitch = 1,
      volume = 1,
      language = context.currentLanguage.code
    } = options;

    if ('speechSynthesis' in window) {
      // Translate text if needed
      let textToSpeak = text;
      if (language !== 'en') {
        textToSpeak = await translateService.translate(text, language);
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = language;
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.volume = volume;
      
      speechSynthesis.speak(utterance);
      return true;
    }
    
    return false;
  }, [context.currentLanguage.code]);

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  }, []);

  // Clear translation cache
  const clearCache = useCallback(() => {
    setTranslationCache(new Map());
    translateService.clearCache();
  }, []);

  return {
    // From context
    ...context,
    
    // Enhanced functions
    t,
    translateBatch,
    formatCurrency,
    formatDate,
    formatNumber,
    speak,
    stopSpeaking,
    clearCache,
    
    // State
    isTranslating,
    
    // Helper getters
    isRTL: context.currentLanguage.dir === 'rtl',
    languageCode: context.currentLanguage.code,
    languageName: context.currentLanguage.name,
  };
};

// Hook for form validation with i18n
export const useValidation = () => {
  const { t } = useLanguageContext();

  const validateEmail = useCallback(async (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return await t('Email is required');
    if (!emailRegex.test(email)) return await t('Invalid email format');
    return null;
  }, [t]);

  const validateRequired = useCallback(async (value, fieldName) => {
    if (!value || value.toString().trim() === '') {
      return await t('{{field}} is required', { field: fieldName });
    }
    return null;
  }, [t]);

  const validateMinLength = useCallback(async (value, minLength, fieldName) => {
    if (value && value.length < minLength) {
      return await t('{{field}} must be at least {{min}} characters', 
        { field: fieldName, min: minLength });
    }
    return null;
  }, [t]);

  const validateNumber = useCallback(async (value, fieldName, options = {}) => {
    const { min, max, required = true } = options;
    
    if (required && (value === null || value === undefined || value === '')) {
      return await t('{{field}} is required', { field: fieldName });
    }
    
    if (value !== null && value !== undefined && value !== '') {
      const num = Number(value);
      if (isNaN(num)) {
        return await t('{{field}} must be a valid number', { field: fieldName });
      }
      if (min !== undefined && num < min) {
        return await t('{{field}} must be at least {{min}}', { field: fieldName, min });
      }
      if (max !== undefined && num > max) {
        return await t('{{field}} must be at most {{max}}', { field: fieldName, max });
      }
    }
    
    return null;
  }, [t]);

  return {
    validateEmail,
    validateRequired,
    validateMinLength,
    validateNumber,
  };
};

// Higher-order component for automatic translation
export const withAutoTranslate = (Component) => {
  return function WithAutoTranslateComponent(props) {
    const { t, isTranslating } = useLanguage();
    
    return (
      <>
        {isTranslating && (
          <div className="translation-loading">
            <div className="spinner"></div>
          </div>
        )}
        <Component {...props} t={t} />
      </>
    );
  };
};