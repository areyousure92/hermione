import {
  GET_CARDLIST,
  GET_CARDLIST_ERROR,
  CREATE_CARD,
  CREATE_CARD_ERROR,
  UPDATE_CARD,
  UPDATE_CARD_ERROR,
} from '../actionTypes';

const initialState = {
  cards: [],
  updatedCard: {},
  updateCardErrorMessage: '',
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
      
    default:
      return state;
  }
}

export default cardReducer;

