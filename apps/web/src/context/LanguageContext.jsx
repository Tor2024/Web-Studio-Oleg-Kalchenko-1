"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../utils/i18n";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguage должен использоваться внутри LanguageProvider",
    );
  }
  return context;
};

const tFactory = (language) => (key) => {
  if (!key) return '';
  const keys = key.split(".");
  let value = translations[language] || translations['de'];

  for (const k of keys) {
    if (!value) return key;
    value = value[k];
  }

  return value || key;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("de");
  const [t, setT] = useState(() => tFactory("de"));

  // Update t function when language changes
  useEffect(() => {
    setT(() => tFactory(currentLanguage));
  }, [currentLanguage]);

  // Load saved language from localStorage or detect from browser
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferred-language");
    if (savedLanguage && ["de", "ru", "en"].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    } else {
      // Auto-detect language
      const browserLang = navigator.language || navigator.userLanguage;
      if (browserLang.startsWith("ru")) {
        setCurrentLanguage("ru");
      } else if (browserLang.startsWith("de")) {
        setCurrentLanguage("de");
      } else {
        setCurrentLanguage("en"); // Default to English for international users
      }
    }
  }, []);

  // Save selected language
  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem("preferred-language", language);
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
