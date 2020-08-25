import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { updateCardFetch, readCardFetch } from '../../redux/actions/cardActions';

const EditCard = ({ 
  readedCard, updateCard, userId, username, readCard,
}) => {
  const question = React.useRef();
  const answer = React.useRef();
  const { deckId, cardId } = useParams();
  const history = useHistory();

  const updateSubmitHandler = (e) => {
    e.preventDefault();
    const cardData = {
      q: question.current.value,
      a: answer.current.value,
    };
    updateCard(userId, deckId, cardId, cardData)
      .then(readCard(userId, deckId, cardId))
      .then(history.push(`/${username}/card/${deckId}/${cardId}`));
  };

  const cancelClickHandler = (e) => {
    e.preventDefault();
    history.push(`/${username}/card/${deckId}/${cardId}/settings`);
  };

  return (
    <form className="editcard" onSubmit={updateSubmitHandler}>
      <div className="editcard__container">
        <textarea className="editcard__q" defaultValue={readedCard.q} ref={question}></textarea>
        <textarea className="editcard__a" defaultValue={readedCard.a} ref={answer}></textarea>
      </div>
      <div className="editcard__btns">
        <input type="button" onClick={cancelClickHandler} value="Отмена" />
        <input type="submit" value={`Сохранить`} />
      </div>
    </form>
  );
};

EditCard.propTypes = {
  readedCard: PropTypes.object,
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  readCard: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  readedCard: state.card.readedCard,
  userId: state.auth.userId,
  username: state.auth.username,
});

const mapDispatchToProps = (dispatch) => ({
  updateCard: (userId, deckId, cardId, cardData) =>
    dispatch(updateCardFetch(userId, deckId, cardId, cardData)),
  readCard: (userId, deckId, cardId) => 
    dispatch(readCardFetch(userId, deckId, cardId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCard);

