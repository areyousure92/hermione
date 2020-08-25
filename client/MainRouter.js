import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './components/ui/Main/Main';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Error404 from './components/Error404/Error404';
import Deck from './components/Deck/Deck';
import Learn from './components/Learn/Learn';
import Card from './components/Card/Card';
import Progress from './components/Progress/Progress';
import User from './components/User/User';

const MainRouter = () => {
  return (
    <>
      <Header />
      <Progress />
      <Main>
        <Switch>
          <PrivateRoute path="/" exact component={User}  />
          <Route path="/auth" exact component={Auth} />
          <PrivateRoute path="/:username/deck/:deckId" component={Deck} />
          <PrivateRoute path="/:username/learn/:deckId" component={Learn} />
          <PrivateRoute path="/:username/card/:deckId/:cardId" component={Card} />
          <PrivateRoute path="/:username" component={User} />
          <Route component={Error404} />
        </Switch>
      </Main>
    </>
  );
}

export default MainRouter;

