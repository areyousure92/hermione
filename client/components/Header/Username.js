import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { signoutFetch } from '../../redux/actions/authActions';

const Username = ({ username, signout }) => {
  const signoutHandler = (e) => {
    e.preventDefault();
    signout();
  };

  return (
    <div className="header__username">
      <span><Link to={`/${username}`}>{ username }</Link></span>
      { username && <input type="button" value="Выйти" onClick={ signoutHandler } /> }
    </div>
  );
}

Username.propTypes = {
  username: PropTypes.string,
};

const mapStateToProps = (state) => ({
  username: state.auth.username,
});

const mapDispatchToProps = (dispatch) => ({
  signout: () => dispatch(signoutFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Username);

