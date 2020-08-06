import React from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Progress from './Progress';
import Username from './Username';

const Header = () => {
  return (
    <div>
      <Logo />
      <Progress />
      <Username />
    </div>
  );
}

export default Header;

