import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { language } from '@/assets/language';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        ...language.en
      }
    },
    zh: {
      translation: {
        ...language.zh
      }
    }
  },
  lng: 'zh',
  fallbackLng: 'zh',
  interpolation: {
    escapeValue: false
  }
});
