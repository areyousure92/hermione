import React from 'react';
import Logo from './Logo';
import Progress from './Progress';
import Username from './Username';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <Logo />
      <Progress />
      <Username />
    </div>
  );
}

export default Header;

