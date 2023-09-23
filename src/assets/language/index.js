import aboutEn from './about/en.json';
import aboutZh from './about/zh.json';
import homeEn from './home/en.json';
import homeZh from './home/zh.json';

export const language = {
  en: { ...homeEn, ...aboutEn },
  zh: { ...homeZh, ...aboutZh }
};

export default {};
