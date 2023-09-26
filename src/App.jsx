import dayjs from 'dayjs';
import { ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import enUS from 'antd/locale/en_US';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';
import './utils/initalLanguage';
import emitter from './utils/eventBus';
import router from './router';

export default function App() {
  const [lang, setLang] = useState('zh-cn');

  useEffect(() => {
    emitter.on('changeLanguage', (value) => {
      dayjs.locale(lang);
      setLang(value);
    });
  }, []);

  return (
    <ConfigProvider locale={lang === 'en' ? enUS : zhCN}>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
    </ConfigProvider>
  );
}
