import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateUserFetch } from '../../../redux/actions/userActions';

const EditUser = ({ username, updateUser, userId }) => {
  const usernameRef = useRef();
  const history = useHistory();

  const editUserHandler = (e) => {
    e.preventDefault();
    const userData = {
      username: usernameRef.current.value,
    };
    updateUser(userId, userData)
      .then(() => history.push(`/${username}`));
  };

  const cancelEditHandler = (e) => {
    e.preventDefault();
    history.push(`/${username}`);
  }

  return (
    <form className="edituser" onSubmit={editUserHandler}>
      <input type="text" defaultValue={username} ref={usernameRef} />
      <div className="edituser__btns">
        <input type="button" onClick={cancelEditHandler} value="Отмена" />
        <input type="submit" value="Сохранить" />
      </div>
    </form>
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

