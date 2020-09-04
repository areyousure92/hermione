import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserCardsNumberFetch } from '../../redux/actions/userActions';

const Progress = ({ 
  userId, todaysCards, repeatedCards, getUserCardsNumber 
}) => {

  useEffect(() => {
    const fetchUserCards = async (userId) => {
      if (userId) {
        getUserCardsNumber(userId);
      }
    };
    fetchUserCards(userId);
  }, [userId]);
  
  return (
    <div className="progress"
         title={`${repeatedCards} / ${todaysCards}`}
    >
      <div 
        style={{
          width: (repeatedCards/todaysCards) * 100 +'%', 
          background: 'rgba(50, 200, 50, 0.7)',
          transition: '0.2s',
        }}
      ></div>
    </div>
  );
};

Progress.propTypes = {
  userId: PropTypes.string,
  todaysCards: PropTypes.number.isRequired,
  repeatedCards: PropTypes.number.isRequired,
  getUserCardsNumber: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
  todaysCards: state.user.todaysCards,
  repeatedCards: state.user.repeatedCards,
});

const mapDispatchToProps = (dispatch) => ({
  getUserCardsNumber: (userId) => dispatch(getUserCardsNumberFetch(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Progress);

