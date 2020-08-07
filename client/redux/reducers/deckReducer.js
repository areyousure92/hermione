import {
  GET_DECKLIST,
  GET_DECKLIST_ERROR,
  CREATE_DECK,
  CREATE_DECK_ERROR,
  DELETE_DECK,
  DELETE_DECK_ERROR,
} from '../actionTypes';

const initialState = {
  decks: [],
};

const deckReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DECKLIST:
      return { ...state, decks: action.payload };

    case GET_DECKLIST_ERROR:
      return { ...state, getDeckListErrorMessage: action.payload };

    case CREATE_DECK: 
      return { ...state, createDeckMessage: action.payload };

    case CREATE_DECK_ERROR:
      return { ...state, createDeckErrorMessage: action.payload };

    case DELETE_DECK:
      return { ...state, deletedDeck: action.payload };

    case DELETE_DECK_ERROR: 
      return { ...state, deleteDeckErrorMessage: action.payload };

    default:
      return state;
  }
}

export default deckReducer;
