import {
  GET_CARDS_TO_LEARN,
  SHOW_CARD_ANSWER,
  HIDE_CARD_ANSWER,
} from '../actionTypes';

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

export {
  getCardsToLearn,
  showCardAnswer,
  hideCardAnswer,
};

