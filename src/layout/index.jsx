import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, redirect, useNavigation } from 'react-router-dom';
import emitter from '@/utils/eventBus';
import { localCache } from '@/utils/cache';

export async function LayoutLoader() {
  const token = localCache.getCache('token');
  if (!token) {
    return redirect('/login');
  }
  return null;
}

export default function Layout() {
  const navigation = useNavigation();
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    emitter.emit('changeLanguage', lng);
  };

  return (
    <div>
      <div style={{ position: 'fixed', top: 0, right: 0 }}>
        {navigation.state !== 'idle' && <p>Navigation in progress...</p>}
      </div>

      <div>
        <Button type="primary" style={{ marginRight: 8 }} onClick={() => changeLanguage('en')}>
          English
        </Button>
        <Button onClick={() => changeLanguage('zh-ch')}>中文</Button>
      </div>

      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard/messages">Messages (Dashboard)</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}
