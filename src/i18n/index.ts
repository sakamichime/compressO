import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import deTranslation from './locales/de/translation.json'
import enTranslation from './locales/en/translation.json'
import esTranslation from './locales/es/translation.json'
import frTranslation from './locales/fr/translation.json'
import idTranslation from './locales/id/translation.json'
import jaTranslation from './locales/ja/translation.json'
import koTranslation from './locales/ko/translation.json'
import ptTranslation from './locales/pt/translation.json'
import ruTranslation from './locales/ru/translation.json'
import viTranslation from './locales/vi/translation.json'
import zhTranslation from './locales/zh/translation.json'

const resources = {
  en: { translation: enTranslation },
  zh: { translation: zhTranslation },
  ja: { translation: jaTranslation },
  ko: { translation: koTranslation },
  es: { translation: esTranslation },
  fr: { translation: frTranslation },
  de: { translation: deTranslation },
  ru: { translation: ruTranslation },
  pt: { translation: ptTranslation },
  vi: { translation: viTranslation },
  id: { translation: idTranslation },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  })

export default i18n
