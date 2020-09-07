import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { updateUserFetch } from '../../../redux/actions/userActions';

const EditUser = ({ username, updateUser, userId }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    updateUser(userId, data)
      .then(() => history.push(`/${data.username}`));
  };

  const history = useHistory();

  const cancelEditHandler = (e) => {
    e.preventDefault();
    history.push(`/${username}`);
  }

  return (
    <>
    <form className="edituser" onSubmit={handleSubmit(onSubmit)}>
      <input 
        name="username"
        type="text" 
        defaultValue={username} 
        ref={register({
          required: true, 
          minLength: 6, 
          maxLength: 20, 
          pattern: /^[A-Za-z0-9]+$/i
        })} 
      />
      <div className="edituser__btns">
        <input type="button" onClick={cancelEditHandler} value="Отмена" />
        <input type="submit" value="Сохранить" />
      </div>
    </form>
    { errors.username && errors.username.type === "required" && <span className="validation_error">Поле не может быть пустым.</span>}
    { errors.username && errors.username.type === "minLength" && <span className="validation_error">Логин должен быть не меньше 6 символов.</span>}
    { errors.username && errors.username.type === "maxLength" && <span className="validation_error">Логин должен быть не больше 20 символов.</span>}
    { errors.username && errors.username.type === "pattern" && <span className="validation_error">Логин должен содержать только латинские буквы и/или цифры.</span>}
    </>
  );
};

EditUser.propTypes = {
  userId: PropTypes.string,
  username: PropTypes.string,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.auth.username,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  updateUser: (userId, userData) => 
    dispatch(updateUserFetch(userId, userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);

