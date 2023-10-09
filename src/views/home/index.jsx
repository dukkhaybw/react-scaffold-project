import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '@/store/reducer/counterSlice';
import { Link, Outlet } from 'react-router-dom';

export default function Home() {
  const count = useSelector((state) => state.counter.value);

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
      <div>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="test">test</Link>
          </li>
        </ul>
      </div>
      <hr />
      <Outlet />
    </div>
  );
}

Home.displayName = 'Home';
