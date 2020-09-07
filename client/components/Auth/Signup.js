import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { signupFetch } from '../../redux/actions/userActions';

const Signup = ({ signup, signupErrorMessage, signupMessage }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  let isPasswordsEqual = watch("password") === watch("passwordConfirm");

  const onSubmit = (data) => {
    if (!isPasswordsEqual) {
      return;
    }
    const { username, password } = data;
    const userData = {
      username,
      password,
    };
    signup(userData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="signup">
      {
        signupErrorMessage
          && <p className="signup_error_message">{ signupErrorMessage }</p>
      }
      {
        signupMessage
          && <p className="signup_message">{ signupMessage }</p>
      }
        <input 
          name="username"
          type="text" 
          placeholder="Логин" 
          ref={ register({
            required: true, 
            minLength: 6, 
            maxLength: 20, 
            pattern: /^[A-Za-z0-9]+$/i
          }) } 
        />
          { errors.username && errors.username.type === "required" && <span className="signup_error_message">Поле не может быть пустым.</span>}
          { errors.username && errors.username.type === "minLength" && <span className="signup_error_message">Логин должен быть не меньше 6 символов.</span>}
          { errors.username && errors.username.type === "maxLength" && <span className="signup_error_message">Логин должен быть не больше 20 символов.</span>}
          { errors.username && errors.username.type === "pattern" && <span className="signup_error_message">Логин должен содержать только латинские буквы и/или цифры.</span>}
        <input 
          name="password"
          type="password" 
          placeholder="Пароль" 
          ref={ register({
            required: true,
            minLength: 6,
            maxLength: 64,
          }) } 
        />
        { errors.password && errors.password.type === "required" && <span className="signup_error_message">Поле обязательно.</span>}
        { errors.password && errors.password.type === "minLength" && <span className="signup_error_message">Пароль должен быть не меньше 6 символов.</span>}
        { errors.password && errors.password.type === "maxLength" && <span className="signup_error_message">Пароль должен быть не больше 64 символов.</span>}
        <input 
          name="passwordConfirm"
          type="password" 
          placeholder="Пароль еще раз" 
          ref={ register } 
        />
        { !isPasswordsEqual && <span className="signup_error_message">Пароли не совпадают.</span>}
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

