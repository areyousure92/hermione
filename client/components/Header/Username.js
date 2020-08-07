import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Username = ({ username }) => {
  return (
    <div>
      { username }
    </div>
  );
}

Username.propTypes = {
  username: PropTypes.string,
};

const mapStateToProps = (state) => ({
  username: state.auth.username,
});

export default connect(mapStateToProps)(Username);

