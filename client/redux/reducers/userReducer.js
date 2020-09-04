import {
  SIGNUP,
  SIGNUP_ERROR,
  UPDATE_USER,
  UPDATE_USER_ERROR,
  DELETE_USER,
  DELETE_USER_ERROR,
  READ_USER,
  READ_USER_ERROR,
  GET_USER_CARDS_NUMBER,
  GET_USER_CARDS_NUMBER_ERROR,
} from '../actionTypes';

const initialState = {
  signupMessage: '',
  signupErrorMessage: '',
  allCards: 0,
  todaysCards: 0,
  repeatedCards: 0,
  newCards: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return { ...state, signupMessage: action.payload };

    case SIGNUP_ERROR:
      return { ...state, signupErrorMessage: action.payload };

    case UPDATE_USER:
      //return { ...state, updatedUser: action.payload };
      return state;

    case UPDATE_USER_ERROR:
      return { ...state, updateUserErrorMessage: action.payload };

    case DELETE_USER: 
      return { ...state, deletedUser: action.payload };

    case DELETE_USER_ERROR:
      return { ...state, deleteUserErrorMessage: action.payload };

    case READ_USER:
      return { ...state, username: action.payload.username };

    case READ_USER_ERROR: 
      return { ...state, readUserErrorMessage: action.payload };

    case GET_USER_CARDS_NUMBER:
      return { 
        ...state, 
        allCards: action.payload.allCards,
        todaysCards: action.payload.todaysCards,
        repeatedCards: action.payload.repeatedCards,
        newCards: action.payload.newCards,
      };

    case GET_USER_CARDS_NUMBER_ERROR:
      return { ...state, getUserCardsNumberErrorMessage: action.payload };

    default:
      return state;
  }
};

export default userReducer;

