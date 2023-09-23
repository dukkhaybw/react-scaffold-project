import { RouterProvider } from 'react-router-dom';
import router from './router';

export default function App() {
  return (
    <div className="App">
      <h1>React Router</h1>
      <RouterProvider router={router} />
    </div>
  );
}
