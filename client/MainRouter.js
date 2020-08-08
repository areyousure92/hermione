import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Error404 from './components/Error404/Error404';
import Deck from './components/Deck/Deck';

const MainRouter = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/auth" component={Auth} exact />
        <Route path="/deck/:deckId" component={Deck} />
        <Route component={Error404} />
      </Switch>
    </div>
  );
}

export default MainRouter;
