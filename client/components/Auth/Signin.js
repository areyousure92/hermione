import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signinFetch } from '../../redux/actions/authActions';

const Signin = ({ signin, signinErrorMessage }) => {
  const username = React.useRef();
  const password = React.useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      username: username.current.value,
      password: password.current.value,
    };
    signin(userData);
    username.current.value = '';
    password.current.value = '';
  }

  return (
    <form onSubmit={submitHandler}>
      {
        signinErrorMessage
          ? <p>{ signinErrorMessage }</p>
          : null
      }
      <p><input type="text" placeholder="Логин" ref={username} /></p>
      <p><input type="password" placeholder="Пароль" ref={password} /></p>
      <p><input type="submit" value="Войти" /></p>
    </form>
  );
}

Signin.propTypes = {
  signin: PropTypes.func.isRequired,
  signinErrorMessage: PropTypes.string,
};

const mapStateToProps = (state) => ({
  signinErrorMessage: state.auth.signinErrorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  signin: (userData) => dispatch(signinFetch(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);

