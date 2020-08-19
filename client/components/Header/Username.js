import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signoutFetch } from '../../redux/actions/authActions';

const Username = ({ username, signout }) => {
  const signoutHandler = (e) => {
    e.preventDefault();
    signout();
  };

  return (
    <div className="username">
      <span>{ username }</span>
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

