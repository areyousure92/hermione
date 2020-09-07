import auth from '../../lib/auth/auth-helper';
import {
  GET_CARDLIST,
  GET_CARDLIST_ERROR,
  CREATE_CARD,
  CREATE_CARD_ERROR,
  UPDATE_CARD,
  UPDATE_CARD_ERROR,
  DELETE_CARD,
  DELETE_CARD_ERROR,
  READ_CARD,
  READ_CARD_ERROR,
  SHOW_CARD_LOADING,
  HIDE_CARD_LOADING,
  CLEAR_CARDLIST,
  CLEAR_READED_CARD,
  SHOW_CARD_SAVING,
  HIDE_CARD_SAVING,
} from '../actionTypes';

function getCardList(cards) {
  return {
    type: GET_CARDLIST,
    payload: cards,
  };
}

function getCardListError(errorMessage) {
  return {
    type: GET_CARDLIST_ERROR,
    payload: errorMessage,
  };
}

function getCardListFetch(userId, deckId) {
  return (dispatch) => fetch(
    `/api/cards/${userId}/${deckId}`,
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + auth.isAuthenticated(),
      },
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      if (data.error) {
        dispatch(getCardListError(data.error));
      } else {
        dispatch(getCardList(data));
      }
      return data;
    });
}

function createCard(message) {
  return {
    type: CREATE_CARD,
    payload: message,
  };
}

function createCardError(errorMessage) {
  return {
    type: CREATE_CARD_ERROR,
    payload: errorMessage,
  };
}

function createCardFetch(userId, deckId, cardData) {
  return (dispatch) => fetch(
    `/api/cards/${userId}/${deckId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + auth.isAuthenticated(),
      },
      body: JSON.stringify(cardData),
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      if (data.error) {
        dispatch(createCardError(data.error));
      } else {
        dispatch(createCard(data.message));
      }
    })
    .catch((err) => console.log(err));
}

function updateCard(card) {
  return {
    type: UPDATE_CARD,
    payload: card,
  };
}

function updateCardError(errorMessage) {
  return {
    type: UPDATE_CARD_ERROR,
    payload: errorMessage,
  };
}

function updateCardFetch(userId, deckId, cardId, cardData) {
  return (dispatch) => fetch(
    `/api/cards/${userId}/${deckId}/${cardId}`, 
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': 'Bearer ' + auth.isAuthenticated(),
      },
      body: JSON.stringify(cardData),
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      if (data.error) {
        dispatch(updateCardError(data.error));        
      } else {
        dispatch(updateCard(data));
      }
      return data;
    });
}

function deleteCard(deletedCard) {
  return {
    type: DELETE_CARD,
    payload: deletedCard,
  }
}

function deleteCardError(errorMessage) {
  return {
    type: DELETE_CARD_ERROR,
    payload: errorMessage,
  };
}

function deleteCardFetch(userId, deckId, cardId) {
  return (dispatch) => fetch(
    `/api/cards/${userId}/${deckId}/${cardId}`,
    {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.isAuthenticated(),
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          dispatch(deleteCardError(data.error));
        } else {
          dispatch(deleteCard(data));
        }
      });
}

function readCard(card) {
  return {
    type: READ_CARD,
    payload: card,
  };
}

function readCardError(errorMessage) {
  return {
    type: READ_CARD_ERROR,
    payload: errorMessage,
  };
}

function readCardFetch(userId, deckId, cardId) {
  return (dispatch) => fetch(`/api/cards/${userId}/${deckId}/${cardId}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.isAuthenticated(),
      }
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          dispatch(readCardError(data.error));
        } else {
          dispatch(readCard(data));
        }
      })
}

function showCardLoading() {
  return {
    type: SHOW_CARD_LOADING,
  };
}

function hideCardLoading() {
  return {
    type: HIDE_CARD_LOADING,
  };
}

function clearCardlist() {
  return {
    type: CLEAR_CARDLIST,
  };
}

function clearReadedCard() {
  return {
    type: CLEAR_READED_CARD,
  };
}

function showCardSaving() {
  return {
    type: SHOW_CARD_SAVING,
  };
}

function hideCardSaving() {
  return {
    type: HIDE_CARD_SAVING,
  };
}

export {
  getCardListFetch,
  createCardFetch,
  updateCardFetch,
  deleteCardFetch,
  readCardFetch,
  showCardLoading,
  hideCardLoading,
  clearCardlist,
  clearReadedCard,
  showCardSaving,
  hideCardSaving,
};

