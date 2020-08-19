import auth from '../../lib/auth/auth-helper';
import {
  SIGNIN,
  SIGNOUT,
  SIGNIN_ERROR,
  SHOW_SIGNIN_FORM,
  SHOW_SIGNUP_FORM,
} from '../actionTypes';

const initialState = {
  username: auth.getUsername(),
  userId: auth.getUserId(),
  isSignedIn: Boolean(auth.isAuthenticated()),
  signinErrorMessage: '',
  showSigninForm: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return { 
        ...state, 
        isSignedIn: true,
        username: action.payload.username, 
        userId: action.payload._id 
      };

    case SIGNIN_ERROR:
      return { ...state, signinErrorMessage: action.payload };

    case SIGNOUT:
      return { 
        ...state, 
        signoutMessage: action.payload, 
        isSignedIn: false,
        username: '',
        userId: '',
      };

    case SHOW_SIGNIN_FORM:
      return { ...state, showSigninForm: true };

    case SHOW_SIGNUP_FORM:
      return { ...state, showSigninForm: false };

    default:
      return state;
  }
};

export default authReducer;

