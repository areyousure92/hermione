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
  DECK_SHOW_LOADING,
  DECK_HIDE_LOADING,
  CLEAR_DECKLIST,
  CLEAR_READED_DECK,
} from '../actionTypes';

const initialState = {
  decks: [],
  readedDeck: null,
  deckIsLoading: true,
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

    case READ_DECK: 
      return { ...state, readedDeck: action.payload };

    case UPDATE_DECK:
      return { ...state, updatedDeck: action.payload };

    case UPDATE_DECK_ERROR: 
      return { ...state, updateDeckErrorMessage: action.payload };

    case DECK_SHOW_LOADING:
      return { ...state, deckIsLoading: true };

    case DECK_HIDE_LOADING:
      return { ...state, deckIsLoading: false };
    
    case CLEAR_DECKLIST:
      return { ...state, decks: [] };

    case CLEAR_READED_DECK:
      return { ...state, readedDeck: null };

    default:
      return state;
  }
}

export default deckReducer;

