import React from 'react';

const Main = ({ children }) => {
  return (
    <div className="main">
      <div className="container">
        { children }
      </div>
    </div>
  );
}

export default Main;

