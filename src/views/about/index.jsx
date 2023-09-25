import { useLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Steps, Pagination } from 'antd';

export async function loader() {
  await new Promise((r) => {
    setTimeout(r, 500);
  });
  return 'I came from the About.tsx loader function!';
}

const description = 'This is a description.';
export function Component() {
  const data = useLoaderData();
  const { t } = useTranslation();

  return (
    <div>
      <h2>About</h2>
      <p>{data}</p>
      <div>{t('about.about')}</div>
      <Steps
        current={1}
        items={[
          {
            title: 'Finished',
            description
          },
          {
            title: 'In Progress',
            description,
            subTitle: 'Left 00:00:08'
          },
          {
            title: 'Waiting',
            description
          }
        ]}
      />
      <Pagination defaultCurrent={6} total={500} />
    </div>
  );
}

Component.displayName = 'AboutPage';
