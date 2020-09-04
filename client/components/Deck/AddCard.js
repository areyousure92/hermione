import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createCardFetch } from '../../redux/actions/cardActions';
import { readDeckFetch } from '../../redux/actions/deckActions';
import { getUserCardsNumberFetch } from '../../redux/actions/userActions';

const AddCard = ({ createCard, userId, readDeck, getUserCardsNumber, }) => {
  const question = React.useRef();
  const answer = React.useRef();

  const { deckId } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    const cardData = {
      q: question.current.value,
      a: answer.current.value,
    };
    createCard(userId, deckId, cardData)
      .then(() => getUserCardsNumber(userId))
      .then(() => readDeck(userId, deckId));
    question.current.value = '';
    answer.current.value = '';
  };

  return (
    <form className="addcard-form" onSubmit={submitHandler}>
      <p className="addcard-form__title">Добавить карту</p>
      <div className="addcard-form__container">
        <textarea 
          className="addcard-form__q" 
          placeholder="Вопрос" 
          ref={question}
        ></textarea>
        <textarea 
          className="addcard-form__a" 
          placeholder="Ответ" 
          ref={answer}
        ></textarea>
      </div>
      <div className="addcard-form__btns">
        <input type="reset" value="Очистить" />
        <input type="submit" value="Сохранить" />
      </div>
    </form>
  );
};

AddCard.propTypes = {
  createCard: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  readDeck: PropTypes.func.isRequired,
  getUserCardsNumber: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  createCard: (userId, deckId, cardData) => 
    dispatch(createCardFetch(userId, deckId, cardData)),
  readDeck: (userId, deckId) => dispatch(readDeckFetch(userId, deckId)),
  getUserCardsNumber: (userId) => dispatch(getUserCardsNumberFetch(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);

