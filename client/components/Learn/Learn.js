import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getCardListFetch } from '../../redux/actions/cardActions';
import { 
  getCardsToLearn,
  hideCardAnswer,
} from '../../redux/actions/learnActions';
import { getDeckToLearnFetch } from '../../redux/actions/learnActions';
import MainHeader from '../ui/MainHeader/MainHeader';
import MainBody from '../ui/MainBody/MainBody';
import LearnCard from './LearnCard';
import './Learn.css';

const Learn = ({ 
  userId,
  getCardList,
  getCardsToLearnA,
  hideCardAnswer,
  getDeckToLearn,
  deckToLearn,
}) => {
  const { deckId } = useParams();

  useEffect(() => {
    const fetchCardList = async (userId, deckId) => {
      getDeckToLearn(userId, deckId);
      getCardList(userId, deckId)
        .then((cards) => { 
          getCardsToLearnA(cards)
        });
    };
    fetchCardList(userId, deckId);
    hideCardAnswer();
  }, [userId, deckId]);

  return (
    <>
    <MainHeader>
      <div className="title">{ deckToLearn && deckToLearn.deckname }</div>
      <div className="nav">
        <Link to={`/`}>На главную</Link>    
      </div>
    </MainHeader>
    <MainBody>
      <LearnCard />
    </MainBody>
    </>
  );
};

Learn.propTypes = {
  userId: PropTypes.string.isRequired,
  getCardList: PropTypes.func.isRequired,
  getCardsToLearnA: PropTypes.func.isRequired,
  hideCardAnswer: PropTypes.func.isRequired,
  getDeckToLearn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
  deckToLearn: state.learn.deckToLearn,
});

const mapDispatchToProps = (dispatch) => ({
  getCardsToLearnA: (cards) => dispatch(getCardsToLearn(cards)),
  getCardList: (userId, deckId) => dispatch(getCardListFetch(userId, deckId)),
  hideCardAnswer: () => dispatch(hideCardAnswer()),
  getDeckToLearn: (userId, deckId) => 
    dispatch(getDeckToLearnFetch(userId, deckId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Learn);

