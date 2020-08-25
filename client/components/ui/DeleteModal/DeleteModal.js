import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const DeleteModal = ({ 
  modalIsOpen, closeModal, deleteHandler, text,
}) => {
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className="modalContainer">
        <h3>{ text }?</h3>
        <div className="modalBtnContainer">
          <button 
            className="modalButton cancel" 
            onClick={closeModal}
          >Отмена</button>
          <button 
            className="modalButton confirm" 
            onClick={deleteHandler}
          >Удалить</button>
        </div>
      </div>
    </ReactModal>    
  );
};

DeleteModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default DeleteModal;

