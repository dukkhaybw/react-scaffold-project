import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { localCache } from '@/utils/cache';
import IndexStyle from './style/indexStyle';

export default function Component() {
  const navigate = useNavigate();

  function handleLogin() {
    localCache.setCache('token', 'testToken');
    navigate('/home');
  }
  return (
    <IndexStyle>
      <Button onClick={() => handleLogin()}>设置token并跳转到home页面</Button>
      <div>login</div>
      <Link to="/about">About</Link>
    </IndexStyle>
  );
}

Component.displayName = 'Login';
