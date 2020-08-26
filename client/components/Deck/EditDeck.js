import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { updateDeckFetch, readDeckFetch } from '../../redux/actions/deckActions';

const EditDeck = ({ 
  updateDeck, readedDeck, userId, username, readDeck,
}) => {
  const history = useHistory();
  const deckname = useRef();
  const { deckId } = useParams();

  const updateDeckSubmitHandler = (e) => {
    e.preventDefault();
    const deckData = {
      deckname: deckname.current.value,
    };
    updateDeck(userId, deckId, deckData)
      .then(() => readDeck(userId, deckId))
      .then(() => history.push(`/${username}/deck/${deckId}`));
  };

  const cancelClickHandler = (e) => {
    e.preventDefault();
    history.push(`/${username}/deck/${deckId}/settings`);
  };

  return (
    <form className="editdeck-form" onSubmit={updateDeckSubmitHandler}>
      <input type="text" defaultValue={readedDeck.deckname} ref={deckname} />
      <div className="editdeck__btns">
        <input type="button" onClick={cancelClickHandler} value="Отмена" />
        <input type="submit" value="Обновить" />
      </div>
    </form>
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

