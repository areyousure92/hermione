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
import auth from '../../lib/auth/auth-helper';

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
  return (dispatch) => fetch('/api/users', {
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

function updateUser(updatedUser) {
  auth.setUsername(updatedUser.username);
  return {
    type: UPDATE_USER,
    payload: updatedUser,
  };
}

function updateUserError(errorMessage) {
  return {
    type: UPDATE_USER_ERROR,
    payload: errorMessage,
  };
}

function updateUserFetch(userId, userData) {
  return (dispatch) => fetch(`/api/users/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + auth.isAuthenticated(),
    },
    body: JSON.stringify(userData),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.error) {
        dispatch(updateUserError(data.error));
      } else {
        dispatch(updateUser(data));
      }
    });
}

function deleteUser(deletedUser) {
  return {
    type: DELETE_USER,
    payload: deletedUser,
  };
}

function deleteUserError(errorMessage) {
  return {
    type: DELETE_USER_ERROR,
    payload: errorMessage,
  };
}

function deleteUserFetch(userId) {
  return (dispatch) => fetch(`/api/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + auth.isAuthenticated(),
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.error) {
        dispatch(deleteUserError(data.error));
      } else {
        dispatch(deleteUser(data));
      }
    })
}

function readUser(readedUser) {
  return {
    type: READ_USER,
    payload: readedUser,
  };
}

function readUserError(errorMessage) {
  return {
    type: READ_USER_ERROR,
    payload: errorMessage,
  };
}

function readUserFetch(userId) {
  return (dispatch) => fetch(`/api/users/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + auth.isAuthenticated(),
    }
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.error) {
        dispatch(readUserError(data.error));
      } else {
        dispatch(readUser(data));
      }
    })
}

function getUserCardsNumber(cardsNumber) {
  return {
    type: GET_USER_CARDS_NUMBER,
    payload: cardsNumber,
  };
}

function getUserCardsNumberError(errorMessage) {
  return {
    type: GET_USER_CARDS_NUMBER_ERROR,
    payload: errorMessage,
  };
}

function getUserCardsNumberFetch(userId) {
  return (dispatch) => fetch(`/api/users/cardsnumber/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + auth.isAuthenticated(),
    }
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.error) {
        dispatch(getUserCardsNumberError(data.error));
      } else {
        dispatch(getUserCardsNumber(data));
      }
    });
}

export {
  signup,
  signupFetch,
  updateUserFetch,
  deleteUserFetch,
  readUserFetch,
  getUserCardsNumberFetch,
};
