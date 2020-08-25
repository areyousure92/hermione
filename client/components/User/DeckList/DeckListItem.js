import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const DeckListItem = ({ deckname, deckId, username }) => {
  const history = useHistory();

  const clickHandler = (e) => {
    e.preventDefault();
    history.push(`/${username}/deck/${deckId}`);
  };

  return (
    <li className="decklist__item">
      <div className="item__container" onClick={clickHandler}>
        <span className="deckname">{ deckname }</span>
        <span className="cards-number"></span>
      </div>
      <Link to={`/${username}/learn/${deckId}`} className="learn">Учить</Link>
    </li>
  );
}

DeckListItem.propTypes = {
  deckname: PropTypes.string.isRequired,
  deckId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.auth.username,
});

export default connect(mapStateToProps)(DeckListItem);

