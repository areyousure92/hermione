import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { signinFetch } from '../../redux/actions/authActions';

const Signin = ({ signin, signinErrorMessage }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    signin(data)
      .then(() => history.push(`/${data.username}/decklist`));
  };

  const history = useHistory();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="signin">
      {
        signinErrorMessage
          && <p className="signin_error_message">{ signinErrorMessage }</p>
      }
      <input 
        name="username"
        type="text" 
        placeholder="Логин" 
        ref={register({ 
          required: true, 
        })} 
      />
      { errors.username && <span className="signin_error_message">Это поле обязательно</span> }
      <input 
        name="password"
        type="password" 
        placeholder="Пароль" 
        ref={register({
          required: true,
        })} 
      />
      { errors.password && <span className="signin_error_message">Это поле обязательно.</span>}
      <input 
        type="submit" 
        value="Войти" 
      />
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

