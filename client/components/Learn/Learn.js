import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addDays } from '../../lib/date/date-helper';
import { 
  getCardListFetch, 
  updateCardFetch 
} from '../../redux/actions/cardActions';
import { 
  getCardsToLearn,
  showCardAnswer,
  hideCardAnswer,
} from '../../redux/actions/learnActions';


const Learn = ({ 
  userId, updateCard, 
  getCardList, cardsToLearn,
  getCardsToLearnA, showAnswer,
  showCardAnswer, hideCardAnswer,
}) => {
  const { deckId } = useParams();

  const showCardAnswerHandler = (e) => {
    e.preventDefault();
    showCardAnswer();
  };

  useEffect(() => {
    const fetchCardList = async (userId, deckId) => {
      getCardList(userId, deckId)
        .then((cards) => { 
          getCardsToLearnA(cards)
        });
    };
    fetchCardList(userId, deckId);
  }, [userId, deckId]);

  let currentCardToLearn;
  if (cardsToLearn.length > 0) {
    currentCardToLearn = cardsToLearn[0];
  } else {
    currentCardToLearn = null;
  }

  const clickHandler = (e) => {
    e.preventDefault();
    let cardNextDate = currentCardToLearn.nextdate;
    let cardNextInterval = currentCardToLearn.interval;
    let newNextDate = currentCardToLearn.nextdate;

    switch (e.target.name) {
      case "easy":
        cardNextInterval = Math.floor(currentCardToLearn.interval * 3 + 1);
        newNextDate = addDays(cardNextDate, cardNextInterval);
        break;

      case "normal":
        cardNextInterval = Math.floor(currentCardToLearn.interval * 2 + 1);
        newNextDate = addDays(cardNextDate, cardNextInterval);
        break;

      case "hard":
        cardNextInterval = Math.floor(currentCardToLearn.interval * 1.5 + 1);
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
    };

    updateCard(userId, deckId, currentCardToLearn._id, cardData);
    getCardList(userId, deckId)
      .then((cards) => { 
        getCardsToLearnA(cards)
      });
    hideCardAnswer();
  };

  return (
    <div>
      Learn
      {
        currentCardToLearn
        ? <div>
            <div>question: { currentCardToLearn.q }</div>   
            { showAnswer
                ? <><div>answer: { currentCardToLearn.a}</div>
                  <div>
                    <button name="easy" onClick={clickHandler}>Легко</button>    
                    <button name="hard" onClick={clickHandler}>Тяжело</button>
                    <button name="normal" onClick={clickHandler}>В самый раз</button>
                    <button name="forgotten" onClick={clickHandler}>Не помню</button>
                    </div></>
                : <div>
                    <button onClick={showCardAnswerHandler}>Показать ответ</button>
                  </div>
            }
          </div>
        : null
      }
    </div>
  );
};

Learn.propTypes = {
  userId: PropTypes.string.isRequired,
  updateCard: PropTypes.func.isRequired,
  getCardList: PropTypes.func.isRequired,
  cardsToLearn: PropTypes.array,
  showAnswer: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
  cardsToLearn: state.learn.cardsToLearn,
  showAnswer: state.learn.showCardAnswer,
});

const mapDispatchToProps = (dispatch) => ({
  getCardsToLearnA: (cards) => dispatch(getCardsToLearn(cards)),
  updateCard: (userId, deckId, cardId, cardData) => 
    dispatch(updateCardFetch(userId, deckId, cardId, cardData)),
  getCardList: (userId, deckId) => dispatch(getCardListFetch(userId, deckId)),
  showCardAnswer: () => dispatch(showCardAnswer()),
  hideCardAnswer: () => dispatch(hideCardAnswer()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Learn);

