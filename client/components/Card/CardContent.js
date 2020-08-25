import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const CardContent = ({ readedCard }) => {

  return (
    <div className="card-content">
      { readedCard && 
        <>
          <div className="card-content__q">{ readedCard.q }</div>
          <div className="card-content__a">{ readedCard.a }</div>
        </>
      }
    </div>
  );
};

CardContent.propTypes = {
  readedCard: PropTypes.object,
};

const mapStateToProps = (state) => ({
  readedCard: state.card.readedCard,
});

export default connect(mapStateToProps)(CardContent);

