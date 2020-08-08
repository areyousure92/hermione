import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import deckReducer from './reducers/deckReducer';
import cardReducer from './reducers/cardReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  deck: deckReducer,
  card: cardReducer,
});

export default rootReducer;

