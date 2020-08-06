import {
  SIGNUP,
  SIGNUP_ERROR,
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

    default:
      return state;
  }
}

export default userReducer;

