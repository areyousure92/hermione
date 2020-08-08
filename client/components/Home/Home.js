import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import DeckList from './DeckList/DeckList';

const Home = ({ isSignedIn }) => {
  return (
    <div>
      <h2>Home</h2>
      <DeckList />
      {
        isSignedIn
          ? null
          : <Redirect to="/auth" />
      }
    </div>
  );
}

Home.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isSignedIn: state.auth.isSignedIn,
});

export default connect(mapStateToProps)(Home);

