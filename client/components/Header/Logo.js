import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Logo = ({ username }) => {
  return (
    <div className="header__logo">
      <Link to={`/${username}/decklist`}>Hermione</Link>
    </div>
  );
};

Logo.propTypes = {
  username: PropTypes.string,
};

const mapStateToProps = (state) => ({
  username: state.auth.username,
});

export default connect(mapStateToProps)(Logo);

