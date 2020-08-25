import React from 'react';
import PropTypes from 'prop-types';

const MainBody = ({ children }) => {
  return (
    <div className="main__body">
      { children }
    </div>
  );
}

MainBody.propTypes = {
  children: PropTypes.node,
};

export default MainBody;

