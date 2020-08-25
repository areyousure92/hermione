import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
  Link, 
  Route, 
  Switch, 
  useParams,
  useRouteMatch,
  Redirect,
} from 'react-router-dom';
import MainHeader from '../ui/MainHeader/MainHeader';
import MainBody from '../ui/MainBody/MainBody';
import DeckList from './DeckList/DeckList';
import Profile from './Profile/Profile';
import EditUser from './EditUser/EditUser';

const User = ({ realUsername }) => {
  let match = useRouteMatch();

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
        <Switch>
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
};

const mapStateToProps = (state) => ({
  realUsername: state.auth.username,
});

export default connect(mapStateToProps)(User);

