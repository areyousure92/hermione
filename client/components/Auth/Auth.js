import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Signin from './Signin';
import Signup from './Signup';
import {
  showSigninForm,
  showSignupForm,
} from '../../redux/actions/authActions';

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
      <h2>Войти</h2>
      <Signin />
      <button type="button" onClick={showSignupHandler}>
        Создать новый аккаунт
      </button>
    </>
  } else {
    form = <>
      <h2>Зарегистрироваться</h2>
      <Signup />
      <button type="button" onClick={showSigninHandler}>
        Уже есть аккаунт?
      </button>
    </>
  }

  return (
    <div>
      {
        isSignedIn
          ? <Redirect to="/" />
          : null
      }
      <Link to="/">Home</Link>
      <br />
      { form }
    </div>
  );
}

Auth.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
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

