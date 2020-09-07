import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { 
  createDeckFetch, 
} from '../../../redux/actions/deckActions';

const CreateDeck = ({ createDeck, userId, getDeckList }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    createDeck(data, userId)
      .then(getDeckList(userId));
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="decklist__create-deck">
      <input 
        name="deckname"
        className="create-deck__text"
        type="text" 
        placeholder="Новая колода" 
        ref={register({
          required: true,
          minLength: 3,
          maxLength: 64,
        })}
      />
      <input type="submit" className="create-deck__btn" value="Создать" />
    </form>    
      { errors.deckname && errors.deckname.type=="required" && <span className="validation_error">Нужно ввести название колоды.</span>}
      { errors.deckname && errors.deckname.type=="minLength" && <span className="validation_error">Название колоды должно быть не меньше 3 символов.</span>}
      { errors.deckname && errors.deckname.type=="maxLength" && <span className="validation_error">Название колоды должно быть не больше 64 символов.</span>}
    </>
  );
}

CreateDeck.propTypes = {
  createDeck: PropTypes.func.isRequired,
  getDeckList: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => ({
  createDeck: (deckData, userId) => dispatch(createDeckFetch(deckData, userId)),
});

export default connect(null, mapDispatchToProps)(CreateDeck);

