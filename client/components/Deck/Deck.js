import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Link, useParams } from 'react-router-dom';
import CardList from './CardList/CardList';
import AddCard from './AddCard';

const Deck = ({ decks }) => {
  const { deckId } = useParams();

  const deck = decks.find((deck) => deck._id === deckId);
  let deckname = deck.deckname;

  return (
    <div>
      <h2>{ deckname }</h2>

      <Link to="/">На главную</Link>
      <Link to={`/deck/${deckId}/cardlist`}>Посмотреть список карт</Link>
      <Link to={`/deck/${deckId}/addcard`}>Добавить карту</Link>

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
};

const mapStateToProps = (state) => ({
  decks: state.deck.decks,
});

export default connect(mapStateToProps)(Deck);

