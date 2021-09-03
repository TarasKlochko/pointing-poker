import React from 'react';
import { Route, Switch, useLocation } from "react-router-dom";
import MainPage from '../components/mainPage';
import { NotFoundPage } from '../components/notFound';
import WrapperPage from '../components/wrapperPage';

export default function Routing(): JSX.Element {
  const location = useLocation();

  return <div>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/game/:id" component={WrapperPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>;
}