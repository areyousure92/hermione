import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import deckReducer from './reducers/deckReducer';
import cardReducer from './reducers/cardReducer';
import learnReducer from './reducers/learnReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  deck: deckReducer,
  card: cardReducer,
  learn: learnReducer,
});

export default rootReducer;

