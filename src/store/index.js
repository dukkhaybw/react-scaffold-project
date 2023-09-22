import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducer/index';

const middleEnhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer, { initalValue: 'test' }, middleEnhancer);

export default store;
