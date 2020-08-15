import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const DeckListItem = ({ deckname, deckId }) => {
  return (
    <li>
      <div>
        { deckname + " " }
        <Link to={`/deck/${deckId}`}>Посмотреть</Link>
        <Link to={`/learn/${deckId}`}>Учить</Link>
      </div>
    </li>
  );
}

DeckListItem.propTypes = {
  deckname: PropTypes.string.isRequired,
  deckId: PropTypes.string.isRequired,
};

export default DeckListItem;

