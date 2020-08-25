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
    <form onSubmit={submitHandler} className="signup">
      {
        signupErrorMessage
          && <p className="signup_error_message">{ signupErrorMessage }</p>
      }
      {
        signupMessage
          && <p className="signup_message">{ signupMessage }</p>
      }
        <input 
          type="text" 
          placeholder="Логин" 
          ref={ username } 
        />
        <input 
          type="password" 
          placeholder="Пароль" 
          ref={ password } 
        />
        <input 
          type="password" 
          placeholder="Пароль еще раз" 
          ref={ passwordConfirm } 
        />
      <input type="submit" value="Зарегистрироваться" />
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

