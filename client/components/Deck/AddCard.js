import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createCardFetch } from '../../redux/actions/cardActions';
import { readDeckFetch } from '../../redux/actions/deckActions';
import { getUserCardsNumberFetch } from '../../redux/actions/userActions';

const AddCard = ({ createCard, userId, readDeck, getUserCardsNumber, }) => {
  const { register, handleSubmit, reset, errors } = useForm();
  const onSubmit = (data) => {
    createCard(userId, deckId, data)
      .then(() => getUserCardsNumber(userId))
      .then(() => readDeck(userId, deckId));
    reset();
  };

  const { deckId } = useParams();

  return (
    <form className="addcard-form" onSubmit={handleSubmit(onSubmit)}>
      <p className="addcard-form__title">Добавить карту</p>
      <div className="addcard-form__container">
        <textarea 
          name="q"
          className="addcard-form__q" 
          placeholder="Вопрос" 
          ref={register({
            required: true,
          })}
        ></textarea>
        { errors.q && <span className="validation_error">Поле обязательно.</span>}
        <textarea 
          name="a"
          className="addcard-form__a" 
          placeholder="Ответ" 
          ref={register({
            required: true,
          })}
        ></textarea>
        { errors.a && <span className="validation_error">Поле обязательно.</span>}
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

