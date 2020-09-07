import {
  GET_CARDS_TO_LEARN,
  SHOW_CARD_ANSWER,
  HIDE_CARD_ANSWER,
  GET_DECK_TO_LEARN,
  GET_DECK_TO_LEARN_ERROR,
  CLEAR_DECK_TO_LEARN,
  CLEAR_CARDS_TO_LEARN,
  SHOW_LEARN_SAVING,
  HIDE_LEARN_SAVING,
} from '../actionTypes';
import auth from '../../lib/auth/auth-helper';

function getCardsToLearn(cards) {
  const cardsToLearn = cards.filter((card) => {
    const now = new Date();
    const nowMs = Date.parse(now);
    const cardNextDateMs = Date.parse(card.nextdate);
    return cardNextDateMs <= nowMs;
  });

  return {
    type: GET_CARDS_TO_LEARN,
    payload: cardsToLearn,
  };
}

function showCardAnswer() {
  return {
    type: SHOW_CARD_ANSWER,
  };
}

function hideCardAnswer() {
  return {
    type: HIDE_CARD_ANSWER,
  };
}

function getDeckToLearn(readedDeck) {
  return {
    type: GET_DECK_TO_LEARN,
    payload: readedDeck,
  };
}

function getDeckToLearnError(errorMessage) {
  return {
    type: GET_DECK_TO_LEARN_ERROR,
    payload: errorMessage,
  };
}

function getDeckToLearnFetch(userId, deckId) {
  return (dispatch) => 
    fetch(`/api/decks/${userId}/${deckId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.isAuthenticated(),
        },
      },
    )
      .then((resp) => resp.json()) 
      .then((data) => {
        if (data.error) {
          dispatch(getDeckToLearnError(data.error));
        } else {
          dispatch(getDeckToLearn(data));
        }
      });
}

function clearDeckToLearn() {
  return {
    type: CLEAR_DECK_TO_LEARN,
  };
}

function clearCardsToLearn() {
  return {
    type: CLEAR_CARDS_TO_LEARN,
  }
}

function showLearnSaving() {
  return {
    type: SHOW_LEARN_SAVING,
  };
}

function hideLearnSaving() {
  return {
    type: HIDE_LEARN_SAVING,
  };
}

export {
  getCardsToLearn,
  showCardAnswer,
  hideCardAnswer,
  getDeckToLearnFetch,
  clearDeckToLearn,
  clearCardsToLearn,
  showLearnSaving,
  hideLearnSaving,
};

