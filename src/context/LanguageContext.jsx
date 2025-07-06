import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../i18n/en.json';
import es from '../i18n/es.json';

// Create a context for language
const LanguageContext = createContext();

// Provider component to wrap the app and provide language state
export const LanguageProvider = ({ children }) => {
  // State for current language, default to localStorage or 'en'
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'en');
  // Language dictionaries
  const languages = { en, es };

  // Translation function: returns translation or key if missing
  const t = (key) => languages[lang][key] || key;

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using language context
export const useLang = () => useContext(LanguageContext);
