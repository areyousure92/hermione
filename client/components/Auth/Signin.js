import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signinFetch } from '../../redux/actions/authActions';

const Signin = ({ signin, signinErrorMessage }) => {
  const username = React.useRef();
  const password = React.useRef();

  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      username: username.current.value,
      password: password.current.value,
    };
    signin(userData)
      .then(() => history.push("/"));
    username.current.value = '';
    password.current.value = '';
  }

  return (
    <form onSubmit={submitHandler} className="signin">
      {
        signinErrorMessage
          && <p className="signin_error_message">{ signinErrorMessage }</p>
      }
      <input type="text" placeholder="Логин" ref={username} />
      <input type="password" placeholder="Пароль" ref={password} />
      <input type="submit" value="Войти" />
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

