import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addDays } from '../../lib/date/date-helper';
import { 
  showCardAnswer,
  hideCardAnswer,
  getCardsToLearn,
} from '../../redux/actions/learnActions';
import { 
  getCardListFetch, 
  updateCardFetch 
} from '../../redux/actions/cardActions';
import { getUserCardsNumberFetch } from '../../redux/actions/userActions';

const LearnCard = ({ 
  cardsToLearn, showAnswer, updateCard, showCardAnswer, userId, 
  getCardList, getCardsToLearnA, hideCardAnswer, getUserCardsNumber,
}) => {
  const { deckId } = useParams();

  let currentCardToLearn = null;
  if (cardsToLearn.length > 0) {
    currentCardToLearn = cardsToLearn[0];
  }

  const showCardAnswerHandler = (e) => {
    e.preventDefault();
    showCardAnswer();
  };
  
  const clickHandler = (e) => {
    e.preventDefault();
    let cardRepeated = currentCardToLearn.repeated;
    //let cardNextDate = currentCardToLearn.nextdate;
    let cardNextDate = new Date();
    let cardNextInterval = currentCardToLearn.interval;
    let newNextDate = currentCardToLearn.nextdate;

    switch (e.target.name) {
      case "easy":
        if (currentCardToLearn.interval === 0) {
          cardNextInterval = 3;
        } else {
          cardNextInterval = Math.floor(currentCardToLearn.interval * 2.5);
        }
        newNextDate = addDays(cardNextDate, cardNextInterval);
        break;

      case "normal":
        if (currentCardToLearn.interval === 0) {
          cardNextInterval = 2;
        }
        else {
          cardNextInterval = Math.floor(currentCardToLearn.interval * 2);
        }
        newNextDate = addDays(cardNextDate, cardNextInterval);
        break;

      case "hard":
        if (currentCardToLearn.interval === 0) {
          cardNextInterval = 1;
        } else {
          cardNextInterval = Math.floor(currentCardToLearn.interval * 1.5);
        }
        newNextDate = addDays(cardNextDate, cardNextInterval);
        break;

      case "forgotten":
        cardNextInterval = 0;
        newNextDate = addDays(cardNextDate, cardNextInterval);
        break;

      default:
        cardNextInterval = currentCardToLearn.interval;
        newNextDate = currentCardToLearn.nextdate;
        break;
    }
    
    const cardData = {
      interval: cardNextInterval,
      nextdate: newNextDate, 
      lastdate: new Date(),
      repeated: cardRepeated + 1,
    };

    updateCard(userId, deckId, currentCardToLearn._id, cardData);
    getCardList(userId, deckId)
      .then((cards) => { 
        getCardsToLearnA(cards)
      })
      .then(() => getUserCardsNumber(userId));
    hideCardAnswer();
  };

  if (currentCardToLearn) {
    if (showAnswer) {
      return (
        <div className="learn-card">
          <div className="learn-card__content">
            <div className="learn-card__q">{ currentCardToLearn.q }</div>
            <div className="learn-card__a">{ currentCardToLearn.a }</div>
          </div>
          <div className="learn-card__buttons">
            <button name="easy" onClick={clickHandler}>Легко</button>    
            <button name="hard" onClick={clickHandler}>Тяжело</button>
            <button name="normal" onClick={clickHandler}>В самый раз</button>
            <button name="forgotten" onClick={clickHandler}>Не помню</button>     
          </div>
        </div>
      );
    } else {
      return (
        <div className="learn-card">
          <div className="learn-card__content">
            <div className="learn-card__q">{ currentCardToLearn.q }</div>
          </div>
          <div className="learn-card__buttons">
            <button onClick={showCardAnswerHandler}>Показать ответ</button>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div>На сегодня карт нет</div>
    );
  }
};

LearnCard.propTypes = {
  cardsToLearn: PropTypes.array,
  showAnswer: PropTypes.bool.isRequired,
  userId: PropTypes.string,
  getCardsToLearnA: PropTypes.func.isRequired,
  getCardList: PropTypes.func.isRequired,
  updateCard: PropTypes.func.isRequired,
  showCardAnswer: PropTypes.func.isRequired,
  hideCardAnswer: PropTypes.func.isRequired,
  getUserCardsNumber: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cardsToLearn: state.learn.cardsToLearn,
  showAnswer: state.learn.showCardAnswer,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  getCardsToLearnA: (cards) => dispatch(getCardsToLearn(cards)),
  getCardList: (userId, deckId) => dispatch(getCardListFetch(userId, deckId)),
  updateCard: (userId, deckId, cardId, cardData) => 
    dispatch(updateCardFetch(userId, deckId, cardId, cardData)), 
  showCardAnswer: () => dispatch(showCardAnswer()),
  hideCardAnswer: () => dispatch(hideCardAnswer()),
  getUserCardsNumber: (userId) => dispatch(getUserCardsNumberFetch(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LearnCard);

