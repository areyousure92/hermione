import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { deleteCardFetch } from '../../../redux/actions/cardActions';

const CardListItem = ({ card, deckId, userId, deleteCard, getCardList }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const deleteHandler = (e) => {
    e.preventDefault();
    deleteCard(userId, deckId, card._id)
      .then(getCardList(userId, deckId));
  }

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
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
        <button type="button" onClick={openModal}>Удалить</button>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <h3>Удалить карту { card.q }?</h3>
        <button onClick={ closeModal }>Отмена</button>
        <button onClick={ deleteHandler }>Удалить</button>
      </ReactModal>
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

