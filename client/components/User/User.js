import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
  Link, 
  Route, 
  Switch, 
  useParams,
  useRouteMatch,
  Redirect,
  useLocation,
} from 'react-router-dom';
import { clearDeckList } from '../../redux/actions/deckActions';
import { 
  clearDeckToLearn, 
  clearCardsToLearn 
} from '../../redux/actions/learnActions';
import MainHeader from '../ui/MainHeader/MainHeader';
import MainBody from '../ui/MainBody/MainBody';
import DeckList from './DeckList/DeckList';
import Profile from './Profile/Profile';
import EditUser from './EditUser/EditUser';

const User = ({ 
  realUsername, clearDeckList, clearDeckToLearn, clearCardsToLearn, 
}) => {
  let match = useRouteMatch();
  let location = useLocation();

  useEffect(() => {
    //clearDeckList();
    clearDeckToLearn();
    clearCardsToLearn();
  });

  const { username } = useParams();
  if (username !== realUsername) {
    return <Redirect to={`/${realUsername}`} />
  }

  return (
    <>
      <MainHeader>
        <div className="username title">
          { username }   
        </div>
        <div className="nav">
          <Link to={`${match.url}/decklist`}>Список колод</Link>
          <Link to={`${match.url}`}>Аккаунт</Link>
        </div>
      </MainHeader>
      <MainBody>
        <Switch location={location}>
          <Route path={`${match.path}/edituser`} component={EditUser} />
          <Route path={`${match.path}/decklist`} component={DeckList} />
          <Route path={`${match.path}`} exact component={Profile} />
        </Switch>
      </MainBody>
    </>
  );
}

User.propTypes = {
  realUsername: PropTypes.string.isRequired,
  clearDeckList: PropTypes.func.isRequired,
  clearDeckToLearn: PropTypes.func.isRequired,
  clearCardsToLearn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  realUsername: state.auth.username,
});

const mapDispatchToProps = (dispatch) => ({
  clearDeckList: () => dispatch(clearDeckList()),
  clearDeckToLearn: () => dispatch(clearDeckToLearn()),
  clearCardsToLearn: () => dispatch(clearCardsToLearn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);

