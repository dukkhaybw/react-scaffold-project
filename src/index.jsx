import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import App from './App';
import store from './store';
import './style/css/normalize.css';
import './utils/initalLanguage';

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
