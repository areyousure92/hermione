import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const DeckListItem = ({ deckname, deckId }) => {
  return (
    <li>
      <span className="deckname">{ deckname }</span>
      <Link to={`/deck/${deckId}`} className="open">Посмотреть</Link>
      <Link to={`/learn/${deckId}`}className="learn">Учить</Link>
    </li>
  );
}

DeckListItem.propTypes = {
  deckname: PropTypes.string.isRequired,
  deckId: PropTypes.string.isRequired,
};

export default DeckListItem;

