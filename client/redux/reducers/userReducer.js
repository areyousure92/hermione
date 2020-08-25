import {
  SIGNUP,
  SIGNUP_ERROR,
  UPDATE_USER,
  UPDATE_USER_ERROR,
  DELETE_USER,
  DELETE_USER_ERROR,
  READ_USER,
  READ_USER_ERROR,
} from '../actionTypes';

const initialState = {
  signupMessage: '',
  signupErrorMessage: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return { ...state, signupMessage: action.payload };

    case SIGNUP_ERROR:
      return { ...state, signupErrorMessage: action.payload };

      //    case UPDATE_USER:
      //return { ...state, updatedUser: action.payload };

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

    default:
      return state;
  }
};

export default userReducer;

