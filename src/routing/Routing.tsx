import React from 'react';
import { Route, Switch, useLocation } from "react-router-dom";
import MainPage from '../components/main_page/Index';
import { NotFoundPage } from '../components/not_found/Index';
import WrapperPage from '../components/wrapper_page/Index';

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