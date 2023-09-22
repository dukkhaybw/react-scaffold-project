import { useSelector } from 'react-redux';
import Home from './views/home/index';

export default function App() {
  const count = useSelector((state) => state.counter.count);
  return (
    <div>
      <p>{count}</p>
      <button>+1</button>
      <hr />
      <Home />
    </div>
  );
}
