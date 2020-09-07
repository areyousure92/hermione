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
} from '../actionTypes';

const initialState = {
  cards: [],
  updatedCard: {},
  updateCardErrorMessage: '',
  readedCard: null,
  isCardLoading: true,
};
// cosnt initialState = {
//   cards: [
//     {
//       deckId: s23k42jj234k234j,
//       deckCards: [],
//     },
//   ]
// }

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARDLIST:
      return { ...state, cards: action.payload };

    case GET_CARDLIST_ERROR:
      return { ...state, getCardListErrorMessage: action.payload };

    case CREATE_CARD:
      return { ...state, createCardMessage: action.payload };

    case CREATE_CARD_ERROR:
      return { ...state, createCardErrorMessage: action.payload };

    case UPDATE_CARD: 
      return { ...state, updatedCard: action.payload };

    case UPDATE_CARD_ERROR:
      return { ...state, updateCardErrorMessage: action.payload };

    case DELETE_CARD:
      return { ...state, deletedCard: action.payload };

    case DELETE_CARD_ERROR:
      return { ...state, deleteCardErrorMessage: action.payload };

    case READ_CARD:
      return { ...state, readedCard: action.payload };

    case READ_CARD_ERROR:
      return { ...state, readCardErrorMessage: action.payload };

    case SHOW_CARD_LOADING: 
      return { ...state, isCardLoading: true };

    case HIDE_CARD_LOADING:
      return { ...state, isCardLoading: false };

    case CLEAR_CARDLIST:
      return { ...state, cards: [] };

    case CLEAR_READED_CARD:
      return { ...state, readedCard: null };

    default:
      return state;
  }
}

export default cardReducer;

