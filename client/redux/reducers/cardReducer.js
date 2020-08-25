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
} from '../actionTypes';

const initialState = {
  cards: [],
  updatedCard: {},
  updateCardErrorMessage: '',
  readedCard: null,
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
    
    default:
      return state;
  }
}

export default cardReducer;

