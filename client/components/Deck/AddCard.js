import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createCardFetch } from '../../redux/actions/cardActions';

const AddCard = ({ createCard, userId }) => {
  const question = React.useRef();
  const answer = React.useRef();

  const { deckId } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    const cardData = {
      q: question.current.value,
      a: answer.current.value,
    };
    createCard(userId, deckId, cardData);
    question.current.value = '';
    answer.current.value = '';
  }

  return (
    <form onSubmit={submitHandler}>
      <p>Добавить карту</p>
      <textarea placeholder="Вопрос" ref={question}></textarea>
      <textarea placeholder="Ответ" ref={answer}></textarea>
      <input type="submit" value="Сохранить" />
    </form>
  );
};

AddCard.propTypes = {
  createCard: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  createCard: (userId, deckId, cardData) => 
    dispatch(createCardFetch(userId, deckId, cardData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);

