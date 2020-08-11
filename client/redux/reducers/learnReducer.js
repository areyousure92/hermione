import {
  GET_CARDS_TO_LEARN,
  SHOW_CARD_ANSWER,
  HIDE_CARD_ANSWER,
} from '../actionTypes';

const initialState = {
  cardsToLearn: [],
  showCardAnswer: false,
  currentCard: null,
};

const learnReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARDS_TO_LEARN:
      return { ...state, cardsToLearn: action.payload };

    case SHOW_CARD_ANSWER:
      return { ...state, showCardAnswer: true };
    
    case HIDE_CARD_ANSWER:
      return { ...state, showCardAnswer: false };

    default:
      return state;
  }
};

export default learnReducer;

