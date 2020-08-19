import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCardListFetch } from '../../../redux/actions/cardActions';
import CardListItem from './CardListItem';

const CardList = ({ getCardList, cards, userId }) => {
  const { deckId } = useParams();

  useEffect(() => {
    const fetchCardList = async (userId, deckId) => {
      getCardList(userId, deckId);
    }
    fetchCardList(userId, deckId);
  }, [userId, deckId]);

  const cardList = cards.map((card) => 
    <CardListItem 
      key={card._id} 
      card={card} 
      deckId={deckId} 
      userId={userId}
      getCardList={getCardList}
    />
  );

  return (
    <div className="cardlist">
      <p>Список карт:</p>
      <ul>
        { cardList }
      </ul>
    </div>
  );
}

CardList.propTypes = {
  getCardList: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  cards: state.card.cards,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  getCardList: (userId, deckId) => dispatch(getCardListFetch(userId, deckId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);

