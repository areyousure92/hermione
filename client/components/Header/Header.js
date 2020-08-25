import React from 'react';
import Logo from './Logo';
import Pomodoro from './Pomodoro';
import Username from './Username';

const Header = () => {
  return (
    <div className="header">
      <Logo />
      <Pomodoro />
      <Username />
    </div>
  );
}

export default Header;

