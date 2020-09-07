import {
  GET_CARDS_TO_LEARN,
  SHOW_CARD_ANSWER,
  HIDE_CARD_ANSWER,
  GET_DECK_TO_LEARN,
  GET_DECK_TO_LEARN_ERROR,
  CLEAR_DECK_TO_LEARN,
  CLEAR_CARDS_TO_LEARN,
} from '../actionTypes';

const initialState = {
  deckToLearn: null,
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

    case GET_DECK_TO_LEARN:
      return { ...state, deckToLearn: action.payload };

    case GET_DECK_TO_LEARN_ERROR: 
      return { ...state, getDeckToLearnErrorMessage: action.payload };

    case CLEAR_DECK_TO_LEARN:
      return { ...state, deckToLearn: null };

    case CLEAR_CARDS_TO_LEARN:
      return { ...state, cardsToLearn: [] };

    default:
      return state;
  }
};

export default learnReducer;

