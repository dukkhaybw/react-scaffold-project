import { combineReducers } from 'redux';
import counterReducer from './counterSlice';
import personReducer from './personSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  persons: personReducer
});

export default rootReducer;
