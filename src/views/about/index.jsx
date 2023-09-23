import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';

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
    </div>
  );
}

Component.displayName = 'AboutPage';
