import { Pagination } from 'antd';
import { useLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export async function loader() {
  await new Promise((r) => {
    setTimeout(r, 500);
  });
  return 'I came from the About.tsx loader function!';
}

export function Component() {
  const data = useLoaderData();
  const { t } = useTranslation();

  return (
    <div>
      <h2>About</h2>
      <p>{data}</p>
      <div>{t('about.about')}</div>

      <Pagination defaultCurrent={6} total={500} />
    </div>
  );
}

Component.displayName = 'About';
