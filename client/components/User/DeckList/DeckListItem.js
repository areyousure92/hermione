import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { clearReadedDeck } from '../../../redux/actions/deckActions';

const DeckListItem = ({ 
  deckname, deckId, username, 
  allCardsNumber, todaysCardsNumber, newCards,
  repeatedCards, clearReadedDeck,
}) => {
  const history = useHistory();

  const clickHandler = (e) => {
    e.preventDefault();
    clearReadedDeck();
    history.push(`/${username}/deck/${deckId}`);
  };

  return (
    <li className="decklist__item">
      <div className="item__container" onClick={clickHandler}>
        <span className="deckname">{ deckname }</span>
        <span className="cards-number">
          <span className="allcards" title="Все карты">{ allCardsNumber }</span>    
          <span className="new-cards" title="Новые карты">{ newCards }</span>
          <span className="todays-cards" title="На сегодня">{ todaysCardsNumber }</span>
          <span className="repeated-cards" title="Повторено">{ repeatedCards }</span>
        </span>
      </div>
      <Link to={`/${username}/learn/${deckId}`} className="learn">Учить</Link>
    </li>
  );
}

DeckListItem.propTypes = {
  deckname: PropTypes.string.isRequired,
  deckId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  allCardsNumber: PropTypes.number.isRequired,
  todaysCardsNumber: PropTypes.number.isRequired,
  newCards: PropTypes.number.isRequired,
  repeatedCards: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.auth.username,
});

const mapDispatchToProps = (dispatch) => ({
  clearReadedDeck: () => dispatch(clearReadedDeck()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckListItem);

