import { useState } from 'react';

export default function App() {
  let [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count++)}>+1</button>
    </div>
  );
}
