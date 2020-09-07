import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { 
  getCardListFetch, 
  showCardLoading, 
  hideCardLoading, 
} from '../../../redux/actions/cardActions';
import CardListItem from './CardListItem';

const CardList = ({ 
  getCardList, cards, userId, 
  showCardLoading, hideCardLoading, isCardLoading,
}) => {
  const { deckId } = useParams();

  useEffect(() => {
    const fetchCardList = async (userId, deckId) => {
      await getCardList(userId, deckId);
    }
    showCardLoading();
    fetchCardList(userId, deckId)
      .then(() => hideCardLoading());
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
      { isCardLoading
        ? <div className="cardlist__loading">Загрузка...</div> 
        : <ul className="cardlist__container">
            { cardList.length
                ? cardList
                : <p>Колода пуста</p>
            }
          </ul>
      }
    </div>
  );
}

CardList.propTypes = {
  getCardList: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  showCardLoading: PropTypes.func.isRequired,
  hideCardLoading: PropTypes.func.isRequired,
  isCardLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  cards: state.card.cards,
  userId: state.auth.userId,
  isCardLoading: state.card.isCardLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getCardList: (userId, deckId) => dispatch(getCardListFetch(userId, deckId)),
  showCardLoading: () => dispatch(showCardLoading()),
  hideCardLoading: () => dispatch(hideCardLoading()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);

