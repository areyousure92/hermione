import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
  getDeckListFetch, 
  showDeckLoading, 
  hideDeckLoading 
} from '../../../redux/actions/deckActions';
import CreateDeck from './CreateDeck';
import DeckListItem from './DeckListItem';

const DeckList = ({ 
  decks, getDeckList, userId, deckIsLoading, showDeckLoading, hideDeckLoading,
}) => {
  useEffect(() => {
    const fetchDeckList = async (userId) => {
      await getDeckList(userId);
    }
    // showDeckLoading();
    fetchDeckList(userId)
      .then(() => hideDeckLoading());
  }, [userId]);

  const deckList = decks.map((deck) => 
    <DeckListItem 
      key={deck._id} 
      deckname={deck.deckname} 
      deckId={deck._id}
      userId={userId}
      getDeckList={getDeckList}
      allCardsNumber={deck.allCards}
      todaysCardsNumber={deck.todaysCards}
      newCards={deck.newCards}
      repeatedCards={deck.repeatedCards}
    />
  );

  return (
    <div className="decklist">
      <CreateDeck getDeckList={getDeckList} userId={userId} />
      { deckIsLoading
          ? <ul className="decklist__loading">Загрузка...</ul>
          : <ul className="decklist__container">
              { deckList }
            </ul>
      }
    </div>
  );
}

DeckList.propTypes = {
  userId: PropTypes.string,
  decks: PropTypes.array.isRequired,
  getDeckList: PropTypes.func.isRequired,
  deckIsLoading: PropTypes.bool.isRequired,
  showDeckLoading: PropTypes.func.isRequired,
  hideDeckLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  decks: state.deck.decks,
  userId: state.auth.userId,
  deckIsLoading: state.deck.deckIsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getDeckList: (userId) => dispatch(getDeckListFetch(userId)),
  showDeckLoading: () => dispatch(showDeckLoading()),
  hideDeckLoading: () => dispatch(hideDeckLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);

