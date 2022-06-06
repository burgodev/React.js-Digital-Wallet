import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "../src/assets/locales/en/translation.json";
import translationBR from "../src/assets/locales/br/translation.json";

const fallbackLng = ["br"];
const availableLanguages = ["en", "br", "es", "it"];

const resources = {
  en: {
    translation: translationEN
  },
  br: {
    translation: translationBR
  },
  es: {
    translation: translationBR
  },
  it: {
    translation: translationBR
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng,
    detection: {
      checkWhitelist: true
    },
    debug: false,
    whitelist: availableLanguages,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
