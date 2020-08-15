import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import auth from '../../lib/auth/auth-helper';

const PrivateRoute = ({ component: Component, isSignedIn, ...rest }) => {
  return (
    <Route { ...rest } render={props => (
      auth.isAuthenticated()
        ? <Component { ...props } />
        : <Redirect to={{
            pathname: "/auth",
            state: { from: props.location }
          }} />
    )} />
  );
}

const mapStateToProps = (state) => ({
  isSignedIn: state.auth.isSignedIn,
});

export default connect(mapStateToProps)(PrivateRoute);

