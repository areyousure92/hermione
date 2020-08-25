import auth from '../../lib/auth/auth-helper';
import {
  GET_DECKLIST,
  GET_DECKLIST_ERROR,
  CREATE_DECK,
  CREATE_DECK_ERROR,
  DELETE_DECK,
  DELETE_DECK_ERROR,
  READ_DECK,
  UPDATE_DECK,
  UPDATE_DECK_ERROR,
} from '../actionTypes';

function getDeckList(decks) {
  return {
    type: GET_DECKLIST,
    payload: decks,
  }
}

function getDeckListError(errorMessage) {
  return {
    type: GET_DECKLIST_ERROR,
    payload: errorMessage,
  };
}

function getDeckListFetch(userId) {
  return (dispatch) => fetch(`/api/decks/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + auth.isAuthenticated(),
    }
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.error) {
        dispatch(getDeckListError);
      } else {
        dispatch(getDeckList(data));
      }
    });
}

function createDeck(message) {
  return {
    type: CREATE_DECK,
    payload: message,
  };
}

function createDeckError(errorMessage) {
  return {
    type: CREATE_DECK_ERROR,
    payload: errorMessage,
  };
}

function createDeckFetch(deckData, userId) {
  return (dispatch) => fetch(`/api/decks/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Authorization': 'Bearer ' + auth.isAuthenticated(),
    },
    body: JSON.stringify(deckData),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.error) {
        dispatch(createDeckError);
      } else {
        dispatch(createDeck(data.message));
      }
    });
}

function deleteDeck(deletedDeck) {
  return {
    type: DELETE_DECK,
    payload: deletedDeck,
  };
}

function deleteDeckError(errorMessage) {
  return {
    type: DELETE_DECK_ERROR,
    payload: errorMessage,
  };
}

function deleteDeckFetch(userId, deckId) {
  return (dispatch) => fetch(`/api/decks/${userId}/${deckId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + auth.isAuthenticated(),
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.error) {
        dispatch(deleteDeckError(data.error));
      } else {
        dispatch(deleteDeck(data));
      }
    });
}

function readDeck(deck) {
  return {
    type: READ_DECK,
    payload: deck,
  };
}

function readDeckFetch(userId, deckId) {
  return (dispatch) => 
    fetch(`/api/decks/${userId}/${deckId}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + auth.isAuthenticated(),
        },
      },
    )
      .then((resp) => resp.json()) 
      .then((data) => {
        dispatch(readDeck(data));
      });
}

function updateDeck(updatedDeck) {
  return {
    type: UPDATE_DECK,
    payload: updatedDeck,
  };
}

function updateDeckError(errorMessage) {
  return {
    type: UPDATE_DECK_ERROR,
    payload: errorMessage,
  };
}

function updateDeckFetch(userId, deckId, deckData) {
  return (dispatch) => 
    fetch(`/api/decks/${userId}/${deckId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + auth.isAuthenticated(),
      },
      body: JSON.stringify(deckData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          dispatch(updateDeckError(data.error));
        } else {
          dispatch(updateDeck(data));
        }
      });
}

export {
  getDeckListFetch,
  createDeckFetch,
  deleteDeckFetch,
  readDeckFetch,
  updateDeckFetch
};

