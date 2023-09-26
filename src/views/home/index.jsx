import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '@/store/reducer/counterSlice';
import { useState } from 'react';

export default function Home() {
  const count = useSelector((state) => state.counter.value);
  const [number, setNumber] = useState(0);
  const dispatch = useDispatch();
  const { t } = useTranslation();

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

      <Button
        type="primary"
        onClick={() => {
          dispatch(decrement());
        }}
      >
        -1
      </Button>
      <div style={{ paddingTop: 16 }}>{t('home.hello')}</div>

      <hr />
      <div>
        {number}
        <Button onClick={() => setNumber(number + 1)}>+1number</Button>
      </div>
    </div>
  );
}

Home.displayName = 'Home';
