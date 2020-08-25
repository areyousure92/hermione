import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
  Link,
  Switch,
  Route,
  useRouteMatch,
  useParams,
} from 'react-router-dom';
import MainHeader from '../ui/MainHeader/MainHeader';
import MainBody from '../ui/MainBody/MainBody';
import { readCardFetch } from '../../redux/actions/cardActions';
import CardContent from './CardContent';
import CardSettings from './CardSettings';
import EditCard from './EditCard';

const Card = ({ 
  userId, readCard, username,
}) => {
  const { deckId, cardId } = useParams();
  const match = useRouteMatch();

  useEffect(() => {
    const fetchReadCard = async (userId, deckId, cardId) => {
      readCard(userId, deckId, cardId);
    };
    fetchReadCard(userId, deckId, cardId);
  }, [userId, deckId, cardId]);

  return (
    <>
      <MainHeader>
        <div className="title">Карта</div>
        <div className="nav">
          <Link to={`/${username}/deck/${deckId}/cardlist`}>Назад</Link>
          <Link to={`${match.url}`}>Карта</Link>
          <Link to={`${match.url}/settings`}>Настройки</Link>
        </div>
      </MainHeader>
      <MainBody>
        <Switch>
          <Route path={`${match.path}/editcard`} component={EditCard} />
          <Route path={`${match.path}/settings`} component={CardSettings} />
          <Route path={`${match.path}`} component={CardContent} />
        </Switch>
      </MainBody>
    </>
  );
};

Card.propTypes = {
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  readCard: PropTypes.func.isRequired,
  readedCard: PropTypes.object,
};

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
  username: state.auth.username,
  readedCard: state.card.readedCard,
});

const mapDispatchToProps = (dispatch) => ({
  readCard: (userId, deckId, cardId) => 
    dispatch(readCardFetch(userId, deckId, cardId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);

