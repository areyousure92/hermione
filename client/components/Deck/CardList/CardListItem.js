import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearReadedCard } from '../../../redux/actions/cardActions';

const CardListItem = ({ card, deckId, username, clearReadedCard, }) => {
  const history = useHistory();
  const shortQ = card.q.slice(0, 50); 
  const shortA = card.a.slice(0, 50);

  const clickHandler = (e) => {
    e.preventDefault();
    clearReadedCard();
    history.push(`/${username}/card/${deckId}/${card._id}`);
  }
  
  return (
    <li className="cardlist__item" onClick={clickHandler}>
      <div className="q">
        { shortQ }
      </div>
      <div className="a">
        { shortA }
      </div>
    </li>
  );
}

CardListItem.propTypes = {
  card: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  clearReadedCard: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.auth.username,
});

const mapDispatchToProps = (dispatch) => ({
  clearReadedCard: () => dispatch(clearReadedCard()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardListItem);

