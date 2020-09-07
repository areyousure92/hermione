import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { updateDeckFetch, readDeckFetch } from '../../redux/actions/deckActions';

const EditDeck = ({ 
  updateDeck, readedDeck, userId, username, readDeck,
}) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    updateDeck(userId, deckId, data)
      .then(() => readDeck(userId, deckId))
      .then(() => history.push(`/${data.username}/deck/${deckId}`)); 
  };

  const history = useHistory();
  const { deckId } = useParams();

  const cancelClickHandler = (e) => {
    e.preventDefault();
    history.push(`/${username}/deck/${deckId}/settings`);
  };

  return (
    <>
    <form className="editdeck-form" onSubmit={handleSubmit(onSubmit)}>
      <input 
        name="deckname"
        type="text" 
        defaultValue={readedDeck.deckname} 
        ref={register({
          required: true,
          minLength: 3,
          maxLength: 64,
        })} 
      />
      <div className="editdeck__btns">
        <input type="button" onClick={cancelClickHandler} value="Отмена" />
        <input type="submit" value="Обновить" />
      </div>
    </form>
      { errors.deckname && errors.deckname.type=="required" && <span className="validation_error">Нужно ввести название колоды.</span>}
      { errors.deckname && errors.deckname.type=="minLength" && <span className="validation_error">Название колоды должно быть не меньше 3 символов.</span>}
      { errors.deckname && errors.deckname.type=="maxLength" && <span className="validation_error">Название колоды должно быть не больше 64 символов.</span>}
    </>
  );
};

EditDeck.propTypes = {
  updateDeck: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  readDeck: PropTypes.func.isRequired,
  readedDeck: PropTypes.object,
};

const mapStateToProps = (state) => ({
  readedDeck: state.deck.readedDeck,
  userId: state.auth.userId,
  username: state.auth.username,
});

const mapDispatchToProps = (dispatch) => ({
  updateDeck: (userId, deckId, deckData) =>
    dispatch(updateDeckFetch(userId, deckId, deckData)),
  readDeck: (userId, deckId) => 
    dispatch(readDeckFetch(userId, deckId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDeck);

