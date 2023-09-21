import { useState } from 'react';
import Home from './views/home/index';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <Home />
    </div>
  );
}
