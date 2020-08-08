import React from 'react';
import PropTypes from 'prop-types';

const CardListItem = ({ card }) => {
  return (
    <li>
      <div>
        { card.q }
      </div>
      <div>
        { card.a }
      </div>
    </li>
  );
}

CardListItem.propTypes = {
  card: PropTypes.object.isRequired,
};

export default CardListItem;

