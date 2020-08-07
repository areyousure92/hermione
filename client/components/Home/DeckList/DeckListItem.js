import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteDeckFetch } from '../../../redux/actions/deckActions';

const DeckListItem = ({ deckname, userId, deckId, deleteDeck, getDeckList }) => {
  const deleteHandler = (e) => {
    e.preventDefault();
    deleteDeck(userId, deckId)
      .then(getDeckList(userId));
  }

  return (
    <li>
      <div>
        { deckname + " " }
        <input type="button" value="Посмотреть" />
        <input type="button" value="Удалить" onClick={deleteHandler} />
        <input type="button" value="Учить" />
      </div>
    </li>
  );
}

DeckListItem.propTypes = {
  deckname: PropTypes.string.isRequired,
  userId: PropTypes.string,
  deckId: PropTypes.string.isRequired,
  deleteDeck: PropTypes.func.isRequired,
  getDeckList: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteDeck: (userId, deckId) => dispatch(deleteDeckFetch(userId, deckId)),
});

export default connect(null, mapDispatchToProps)(DeckListItem);

