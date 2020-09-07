import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  createCardFetch, 
  showCardSaving, 
  hideCardSaving 
} from '../../redux/actions/cardActions';
import { readDeckFetch } from '../../redux/actions/deckActions';
import { getUserCardsNumberFetch } from '../../redux/actions/userActions';

const AddCard = ({ 
  createCard, userId, readDeck, getUserCardsNumber, 
  isCardSaving, showCardSaving, hideCardSaving,
}) => {
  const { register, handleSubmit, reset, errors } = useForm();
  const onSubmit = (data) => {
    showCardSaving();
    createCard(userId, deckId, data)
      .then(() => getUserCardsNumber(userId))
      .then(() => readDeck(userId, deckId))
      .then(() => hideCardSaving());
    reset();
  };

  const { deckId } = useParams();

  if (isCardSaving) {
    return (
      <div className="addcard-form">Сохранение...</div>
    );
  }

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
  isCardSaving: PropTypes.bool.isRequired,
  showCardSaving: PropTypes.func.isRequired,
  hideCardSaving: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
  isCardSaving: state.card.isCardSaving,
});

const mapDispatchToProps = (dispatch) => ({
  createCard: (userId, deckId, cardData) => 
    dispatch(createCardFetch(userId, deckId, cardData)),
  readDeck: (userId, deckId) => dispatch(readDeckFetch(userId, deckId)),
  getUserCardsNumber: (userId) => dispatch(getUserCardsNumberFetch(userId)),
  showCardSaving: () => dispatch(showCardSaving()),
  hideCardSaving: () => dispatch(hideCardSaving()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);

