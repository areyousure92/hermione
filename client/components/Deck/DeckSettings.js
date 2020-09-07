import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory, Link, useRouteMatch, useParams } from 'react-router-dom';
import { deleteDeckFetch } from '../../redux/actions/deckActions';
import { getUserCardsNumberFetch } from '../../redux/actions/userActions';
import DeleteModal from '../ui/DeleteModal/DeleteModal';
import { dateToString } from '../../lib/date/date-helper';

const DeckSettings = ({ 
  readedDeck, deleteDeck, userId, username, getUserCardsNumber, 
}) => {
  const { deckId } = useParams();
  const match = useRouteMatch();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const history = useHistory();

  function openModal() { setIsOpen(true); }
  function closeModal() { setIsOpen(false); }

  const deleteHandler = (e) => {
    e.preventDefault();
    deleteDeck(userId, deckId)
      .then(closeModal())
      .then(() => getUserCardsNumber(userID))
      .then(history.push(`/${username}/decklist`))
  };

  return (
    <div className="deck-settings info">
      <p>Дата создания: { readedDeck ? dateToString(readedDeck.created) : <span>Загрузка...</span> }</p>
      <p>Количество карт: { readedDeck ? readedDeck.allCards : <span>Загрузка...</span>}</p>
      <Link className="addcard" to={`${match.url}/addcard`}>Добавить карту</Link>
      <div className="info__container">
        <button className="info__delete" onClick={openModal}>Удалить</button>
        <Link className="info__edit" to={`${match.url}/editdeck`}>Редактировать</Link>
      </div>

      <DeleteModal 
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        text={`Удалить колоду ${ readedDeck && readedDeck.deckname }`}
        deleteHandler={ deleteHandler }
      />
    </div>
  );
};

DeckSettings.propTypes = {
  readedDeck: PropTypes.object,
  deleteDeck: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  getUserCardsNumber: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  readedDeck: state.deck.readedDeck,
  userId: state.auth.userId,
  username: state.auth.username,
});

const mapDispatchToProps = (dispatch) => ({
  deleteDeck: (userId, deckId) => dispatch(deleteDeckFetch(userId, deckId)),
  getUserCardsNumber: (userId) => dispatch(getUserCardsNumberFetch(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckSettings);

