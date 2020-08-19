import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import auth from '../../lib/auth/auth-helper';
import Signin from './Signin';
import Signup from './Signup';
import {
  showSigninForm,
  showSignupForm,
} from '../../redux/actions/authActions';
import './Auth.css';

const Auth = ({ isSignedIn, showSigninForm, showSignin, showSignup }) => {
  const showSignupHandler = (e) => {
    e.preventDefault();
    showSignup();
  }
  const showSigninHandler = (e) => {
    e.preventDefault();
    showSignin();
  }

  let form;
  if (showSigninForm) {
    form = <>
      <h3>Войти</h3>
      <Signin />
      <button type="button" onClick={showSignupHandler}>
        Создать новый аккаунт
      </button>
    </>
  } else {
    form = <>
      <h3>Зарегистрироваться</h3>
      <Signup />
      <button type="button" onClick={showSigninHandler}>
        Уже есть аккаунт?
      </button>
    </>
  }

  return (
    <div className="auth">
      {
        isSignedIn && auth.isAuthenticated()
          ? <Redirect to="/" />
          : null
      }
      { form }
    </div>
  );
}

Auth.propTypes = {
  showSigninForm: PropTypes.bool.isRequired,
  showSignin: PropTypes.func.isRequired,
  showSignup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  showSigninForm: state.auth.showSigninForm,
  isSignedIn: state.auth.isSignedIn,
});

const mapDispatchToProps = (dispatch) => ({
  showSignin: () => dispatch(showSigninForm()),
  showSignup: () => dispatch(showSignupForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

