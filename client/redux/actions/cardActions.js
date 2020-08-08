import {
  GET_CARDLIST,
  GET_CARDLIST_ERROR,
  CREATE_CARD,
  CREATE_CARD_ERROR,
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
    `http://localhost:3000/api/cards/${userId}/${deckId}`,
    {
      method: 'GET',
    }
  )
    .then((resp) => resp.json())
    .then((data) => {
      if (data.error) {
        dispatch(getCardListError(data.error));
      } else {
        dispatch(getCardList(data));
      }
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
    `http://localhost:3000/api/cards/${userId}/${deckId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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

export {
  getCardListFetch,
  createCardFetch,
};

