import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';
import { deleteCardFetch } from '../../redux/actions/cardActions';
import DeleteModal from '../ui/DeleteModal/DeleteModal';
import { dateToString } from '../../lib/date/date-helper';
import { getUserCardsNumberFetch } from '../../redux/actions/userActions';

const CardSettings = ({ readedCard, deleteCard, userId, getUserCardsNumber }) => {
  const history = useHistory();
  const { username, deckId, cardId } = useParams();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() { setIsOpen(true); }
  function closeModal() { setIsOpen(false); }

  const deleteCardHandler = (e) => {
    e.preventDefault();
    deleteCard(userId, deckId, cardId)
      .then(() => getUserCardsNumber(userId))
      .then(history.push(`/${username}/deck/${deckId}/cardlist`));
  };

  return (
    <div className="info">
      <div>Карта создана: { dateToString(readedCard.created) }</div>
      <div>Следующая дата: { dateToString(readedCard.nextdate) }</div>    
      <div className="info__container">
        <button className="info__delete" onClick={openModal}>Удалить</button>
        <Link 
          to={`/${username}/card/${deckId}/${readedCard._id}/editcard`}
          className="info__edit"
        >
          Редактировать
        </Link>
      </div>

      <DeleteModal 
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        text={`Удалить карту ${ readedCard && readedCard.q.slice(0, 40) }`}
        deleteHandler={ deleteCardHandler }
      />
    </div>
  );
};

CardSettings.propTypes = {
  readedCard: PropTypes.object,
  userId: PropTypes.string,
  deleteCard: PropTypes.func.isRequired,
  getUserCardsNumber: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  readedCard: state.card.readedCard,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  deleteCard: (userId, deckId, cardId) => 
    dispatch(deleteCardFetch(userId, deckId, cardId)),
  getUserCardsNumber: (userId) => dispatch(getUserCardsNumberFetch(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardSettings);

