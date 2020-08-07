import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDeckListFetch } from '../../../redux/actions/deckActions';
import CreateDeck from './CreateDeck';
import DeckListItem from './DeckListItem';

const DeckList = ({ decks, getDeckList, userId }) => {
  useEffect(() => {
    const fetchDeckList = async (userId) => {
      getDeckList(userId);
    }
    fetchDeckList(userId);
  }, [userId]);

  const deckList = decks.map((deck) => 
    <DeckListItem 
      key={deck._id} 
      deckname={deck.deckname} 
      deckId={deck._id}
      userId={userId}
      getDeckList={getDeckList}
    />
  );

  return (
    <div>
      <CreateDeck getDeckList={getDeckList} userId={userId} />
      DeckList
      <ul>
        { deckList }
      </ul>
    </div>
  );
}

DeckList.propTypes = {
  userId: PropTypes.string,
  decks: PropTypes.array.isRequired,
  getDeckList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  decks: state.deck.decks,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  getDeckList: (userId) => dispatch(getDeckListFetch(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);

