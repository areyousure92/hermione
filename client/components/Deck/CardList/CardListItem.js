import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { deleteCardFetch } from '../../../redux/actions/cardActions';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px'
  }
};

const CardListItem = ({ card, deckId, userId, deleteCard, getCardList }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const shortQ = card.q.slice(0, 50); 
  const shortA = card.a.slice(0, 50);

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
    <li className="card">
      <div className="q">
        { shortQ }
      </div>
      <div className="a">
        { shortA }
      </div>
      <div>
        <button type="button" onClick={openModal}>Удалить</button>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="modalContainer">
          <h3 className="modalH3">Удалить карту { shortQ }?</h3>
          <div className="modalBtnContainer">
            <button 
              className="modalButton cancel" 
              onClick={ closeModal }
            >Отмена</button>
            <button 
              className="modalButton confirm" 
              onClick={ deleteHandler }
            >Удалить</button>
          </div>
        </div>
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

