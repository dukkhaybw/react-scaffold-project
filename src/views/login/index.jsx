import { Link } from 'react-router-dom';
import IndexStyle from './style/indexStyle';

export default function Component() {
  return (
    <IndexStyle>
      <div>login</div>
      <Link to="/about">About</Link>
    </IndexStyle>
  );
}

Component.displayName = 'Login';
