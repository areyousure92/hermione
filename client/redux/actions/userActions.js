import {
  SIGNUP,
  SIGNUP_ERROR,
} from '../actionTypes';

function signup(message) {
  return {
    type: SIGNUP,
    payload: message,
  };
}

function signupError(errorMessage) {
  return {
    type: SIGNUP_ERROR,
    payload: errorMessage,
  };
}

function signupFetch(userData) {
  return (dispatch) => fetch('http://localhost:3000/api/users', {
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
        dispatch(signupError(data.error));
      } else {
        dispatch(signup(data.message));
      }
    });
}

export {
  signup,
  signupFetch,
};
