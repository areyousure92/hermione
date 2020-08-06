import auth from '../../lib/auth/auth-helper';
import {
  SIGNIN,
  SIGNOUT,
  SIGNIN_ERROR,
  SHOW_SIGNIN_FORM,
  SHOW_SIGNUP_FORM, 
} from '../actionTypes';

function showSigninForm() {
  return {
    type: SHOW_SIGNIN_FORM,
  };
}
function showSignupForm() {
  return {
    type: SHOW_SIGNUP_FORM,
  };
}

function signin(data) {
  auth.authenticate(data.token, data.user._id, data.user.username);
  return {
    type: SIGNIN,
    payload: data.user,
  };
}
function signinError(errorMessage) {
  return {
    type: SIGNIN_ERROR,
    payload: errorMessage,
  };
}

function signinFetch(userData) {
  return (dispatch) => fetch('http://localhost:3000/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.error) {
        dispatch(signinError(data.error));
      } else {
        dispatch(signin(data));
      }
    });
}

function signout(signoutMessage) {
  auth.clearUserData();
  auth.clearCookie();
  return {
    type: SIGNOUT,
    payload: signoutMessage,
  };
}

function signoutFetch() {
  return (dispatch) => fetch('http://localhost:3000/auth/signout', {
    method: 'GET',
  })
    .then(resp => resp.json())
    .then(data => dispatch(signout(data.message)))
    .catch(err => console.log(err)); // 
}

export {
  showSigninForm,
  showSignupForm,
  signinFetch,
  signoutFetch,
};

