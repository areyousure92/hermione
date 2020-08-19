import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
  createDeckFetch, 
} from '../../../redux/actions/deckActions';

const CreateDeck = ({ createDeck, userId, getDeckList }) => {
  const deckname = React.useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const deckData = {
      deckname: deckname.current.value,
    };

    createDeck(deckData, userId)
      .then(getDeckList(userId));

    deckname.current.value = '';
  }

  return (
    <form onSubmit={submitHandler} className="createDeck">
      <input 
        type="text" 
        placeholder="Новая колода" 
        ref={deckname}
      />
      <input type="submit" value="Создать" />
    </form>    
  );
}

CreateDeck.propTypes = {
  createDeck: PropTypes.func.isRequired,
  getDeckList: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => ({
  createDeck: (deckData, userId) => dispatch(createDeckFetch(deckData, userId)),
});

export default connect(null, mapDispatchToProps)(CreateDeck);

