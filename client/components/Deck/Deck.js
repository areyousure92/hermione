import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Link, useParams } from 'react-router-dom';
import CardList from './CardList/CardList';
import AddCard from './AddCard';
import { deleteDeckFetch } from '../../redux/actions/deckActions';

const Deck = ({ decks, deleteDeck, userId }) => {
  const { deckId } = useParams();

  const deck = decks.find((deck) => deck._id === deckId);
  let deckname = deck.deckname;

  const deleteHandler = (e) => {
    e.preventDefault();
    deleteDeck(userId, deckId);
  }

  return (
    <div>
      <h2>{ deckname }</h2>

      <Link to="/">На главную</Link>
      <br />
      <Link to={`/deck/${deckId}/cardlist`}>Посмотреть список карт</Link>
      <br />
      <Link to={`/deck/${deckId}/addcard`}>Добавить карту</Link>
      <br />
      <Link to={`/learn/${deckId}`}>Учить эту колоду</Link>
      <br />
      <button type="button" onClick={deleteHandler} >Удалить эту колоду</button>

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
    </div>
  );
};

Deck.propTypes = {
  decks: PropTypes.array,
  deleteDeck: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  decks: state.deck.decks,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  deleteDeck: (userId, deckId) => dispatch(deleteDeckFetch(userId, deckId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Deck);

