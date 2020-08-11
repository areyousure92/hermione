import {
  GET_CARDS_TO_LEARN,
  SHOW_CARD_ANSWER,
  HIDE_CARD_ANSWER,
  UPDATE_THE_EASY_CARD,
  UPDATE_THE_NORMAL_CARD,
  UPDATE_THE_DIFFICULT_CARD,
  UPDATE_THE_FORGOTTEN_CARD,
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

function updateTheEasyCard(card) {
  
}

function updateTheNormalCard(card) {
  
}

function updateTheDifficultCard(card) {
  
}

function updateTheForgottenCard(card) {
  
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

