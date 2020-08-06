import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signupFetch } from '../../redux/actions/userActions';

const Signup = ({ signup, signupErrorMessage, signupMessage }) => {
  const username = React.useRef();
  const password = React.useRef();
  const passwordConfirm = React.useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password.current.value !== passwordConfirm.current.value) {
      // validate
      return;
    }
    const userData = {
      username: username.current.value,
      password: password.current.value,
    }
    signup(userData);
    username.current.value = '';
    password.current.value = '';
    passwordConfirm.current.value = '';
  }

  return (
    <form onSubmit={submitHandler}>
      {
        signupErrorMessage
          ? <p>{ signupErrorMessage }</p>
          : null
      }
      {
        signupMessage
          ? <p>{ signupMessage }</p>
          : null
      }
      <p>
        <input 
          type="text" 
          placeholder="Логин" 
          ref={ username } 
        />
      </p>
      <p>
        <input 
          type="password" 
          placeholder="Пароль" 
          ref={ password } 
        />
      </p>
      <p>
        <input 
          type="password" 
          placeholder="Пароль еще раз" 
          ref={ passwordConfirm } 
        />
      </p>
      <p><input type="submit" value="Зарегистрироваться" /></p>
    </form>
  );
}

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  signupMessage: PropTypes.string,
  signupErrorMessage: PropTypes.string,
};

const mapStateToProps = (state) => ({
  signupErrorMessage: state.user.signupErrorMessage,
  signupMessage: state.user.signupMessage,
});

const mapDispatchToProps = (dispatch) => ({
  signup: (userData) => dispatch(signupFetch(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

