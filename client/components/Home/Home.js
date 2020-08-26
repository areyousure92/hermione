import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = ({ username }) => {
  return (
    <Redirect to={`/${username}/decklist`} /> 
  ); 
}

Home.propTypes = {
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.auth.username,
});

export default connect(mapStateToProps)(Home);

