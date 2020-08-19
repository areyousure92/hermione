import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Error404 from './components/Error404/Error404';
import Deck from './components/Deck/Deck';
import Learn from './components/Learn/Learn';

const MainRouter = () => {
  return (
    <>
      <Header />
      <div className="main">
      <Switch>
        <PrivateRoute component={Home} path="/" exact />
        <Route path="/auth" component={Auth} exact />
        <PrivateRoute component={Deck} path="/deck/:deckId" />
        <PrivateRoute component={Learn} path="/learn/:deckId" />
        <Route component={Error404} />
      </Switch>
      </div>
    </>
  );
}

export default MainRouter;
