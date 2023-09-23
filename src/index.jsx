import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';
import i18n from 'i18next';
import { createRoot } from 'react-dom/client';
import { initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import App from './App';
import { language } from './assets/language';
import store from './store';
import './style/css/normalize.css';

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

dayjs.locale('zh-cn');
const root = createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={true ? zhCN : enUS}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
);
