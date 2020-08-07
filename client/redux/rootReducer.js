import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import deckReducer from './reducers/deckReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  deck: deckReducer,
});

export default rootReducer;

