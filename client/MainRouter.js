import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';

const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route path="/" component={Home} exact />
      </Switch>
    </div>
  );
}

export default MainRouter;
