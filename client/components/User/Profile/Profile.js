import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, } from 'react-router-dom';
import { deleteUserFetch } from '../../../redux/actions/userActions';
import { signoutFetch } from '../../../redux/actions/authActions';
import { getUserCardsNumberFetch } from '../../../redux/actions/userActions';
import DeleteModal from '../../ui/DeleteModal/DeleteModal';
import { dateToString } from '../../../lib/date/date-helper';


const Profile = ({ 
  created, username, userId, deleteUser, signout, getUserCardsNumber,
}) => {
  const createdDateString = dateToString(created);

  const deleteUserHandler = (e) => {
    e.preventDefault();
    deleteUser(userId)
      .then(() => getUserCardsNumber(userId))
      .then(() => signout());
  };
  
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() { setIsOpen(true); }
  function closeModal() { setIsOpen(false); }

  return (
    <div className="account info">
      <p>Дата регистрации: { createdDateString }</p>
      <div className="info__container">
        <Link 
          className="info__edit" 
          to={`/${username}/edituser`}
        >
          Редактировать
        </Link>
        <button 
          className="info__delete" 
          onClick={openModal}
        >
          Удалить аккаунт
        </button>
      </div>

      <DeleteModal 
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        text={`Вы действительно хотите удалить свой аккаунт`}
        deleteHandler={ deleteUserHandler }
      />
    </div>
  );
};

Profile.propTypes = {
  created: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  deleteUser: PropTypes.func.isRequired,
  signout: PropTypes.func.isRequired,
  getUserCardsNumber: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  created: state.auth.userCreated,
  username: state.auth.username,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  deleteUser: (userId) => dispatch(deleteUserFetch(userId)),
  signout: () => dispatch(signoutFetch()),
  getUserCardsNumber: (userId) => dispatch(getUserCardsNumberFetch(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

