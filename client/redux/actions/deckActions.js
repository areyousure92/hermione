import {
  GET_DECKLIST,
  GET_DECKLIST_ERROR,
  CREATE_DECK,
  CREATE_DECK_ERROR,
  DELETE_DECK,
  DELETE_DECK_ERROR,
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
  return (dispatch) => fetch(`http://localhost:3000/api/decks/${userId}`, {
    method: 'GET',
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
  return (dispatch) => fetch(`http://localhost:3000/api/decks/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
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
  return (dispatch) => fetch(`http://localhost:3000/api/decks/${userId}/${deckId}`, {
    method: 'DELETE',
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

export {
  getDeckListFetch,
  createDeckFetch,
  deleteDeckFetch,
};

