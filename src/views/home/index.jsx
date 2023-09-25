import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '@/store/action/counter';

export default function Home() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const count = useSelector((state) => state.counter.count);

  return (
    <div>
      <p>{count}</p>
      <Button
        type="primary"
        onClick={() => {
          dispatch(increment());
        }}
      >
        +1
      </Button>
      <div style={{ paddingTop: 16 }}>{t('home.hello')}</div>
    </div>
  );
}
