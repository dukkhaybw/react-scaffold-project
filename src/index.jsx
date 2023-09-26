import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import App from './App';
import store from './store';
import './style/css/global.css';
import './style/css/normalize.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
