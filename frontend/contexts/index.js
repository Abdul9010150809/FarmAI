// Context exports
export { AuthProvider, useAuth, withAuth } from './AuthContext';
export { FarmDataProvider, useFarmData } from './FarmDataContext';
export { LanguageProvider, useLanguage, withTranslation, Languages } from './LanguageContext';

// Main provider component that wraps all contexts
import React from 'react';
import { AuthProvider } from './AuthContext';
import { FarmDataProvider } from './FarmDataContext';
import { LanguageProvider } from './LanguageContext';

export const AppProviders = ({ children }) => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <FarmDataProvider>
          {children}
        </FarmDataProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

// Custom hook to use all contexts
export const useApp = () => {
  const auth = useAuth();
  const farmData = useFarmData();
  const language = useLanguage();
  
  return {
    auth,
    farmData,
    language,
    // Combined state for convenience
    isAuthenticated: auth.isAuthenticated,
    currentUser: auth.user,
    currentFarm: farmData.currentFarm,
    currentLanguage: language.currentLanguage,
    t: language.t
  };
};

export default AppProviders;