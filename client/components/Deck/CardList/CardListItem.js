import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCardFetch } from '../../../redux/actions/cardActions';

const CardListItem = ({ card, deckId, userId, deleteCard, getCardList }) => {
  const clickHandler = (e) => {
    e.preventDefault();
    deleteCard(userId, deckId, card._id)
      .then(getCardList(userId, deckId));
  }
  
  return (
    <li>
      <div>
        { card.q }
      </div>
      <div>
        { card.a }
      </div>
      <div>
        <button type="button" onClick={clickHandler}>Удалить</button>    
      </div>
    </li>
  );
}

CardListItem.propTypes = {
  card: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteCard: (userId, deckId, cardId) => 
    dispatch(deleteCardFetch(userId, deckId, cardId)),
});

export default connect(null, mapDispatchToProps)(CardListItem);

