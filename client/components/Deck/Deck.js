import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
  Switch, 
  Route, 
  Link, 
  useParams, 
  useHistory,
} from 'react-router-dom';
import ReactModal from 'react-modal';
import CardList from './CardList/CardList';
import AddCard from './AddCard';
import { 
  deleteDeckFetch, 
  readDeckFetch,
} from '../../redux/actions/deckActions';

ReactModal.setAppElement('#root');

const Deck = ({ deleteDeck, userId, readDeck, readedDeck }) => {
  const history = useHistory();
  const { deckId } = useParams();
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  
  useEffect(() => {
    const fetchReadDeck = async (userId) => {
      readDeck(userId, deckId);
    }
    fetchReadDeck(userId);
  }, [userId, deckId]);

  const deleteHandler = (e) => {
    e.preventDefault();
    deleteDeck(userId, deckId)
      .then(closeModal())
      .then(history.push('/'))
  }

  return (
    <div>
      <h2>{ readedDeck && readedDeck.deckname }</h2>

      <Link to="/">На главную</Link>
      <br />
      <Link to={`/deck/${deckId}/cardlist`}>Посмотреть список карт</Link>
      <br />
      <Link to={`/deck/${deckId}/addcard`}>Добавить карту</Link>
      <br />
      <Link to={`/learn/${deckId}`}>Учить эту колоду</Link>
      <br />
      <button onClick={openModal}>Удалить эту колоду</button>

      <Switch>
        <Route 
          path={'/deck/:deckId/cardlist'} 
          component={CardList}
        />
        <Route 
          path={'/deck/:deckId/addcard'} 
          component={AddCard}
        />
      </Switch>   

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <h3>Удалить колоду { readedDeck && readedDeck.deckname}?</h3>
        <button onClick={closeModal}>отмена</button>
        <button onClick={deleteHandler}>удалить</button>
      </ReactModal>
    </div>
  );
};

Deck.propTypes = {
  deleteDeck: PropTypes.func.isRequired,
  readDeck: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  readedDeck: PropTypes.object,
};

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
  readedDeck: state.deck.readedDeck,
});

const mapDispatchToProps = (dispatch) => ({
  deleteDeck: (userId, deckId) => dispatch(deleteDeckFetch(userId, deckId)),
  readDeck: (userId, deckId) => dispatch(readDeckFetch(userId, deckId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Deck);

