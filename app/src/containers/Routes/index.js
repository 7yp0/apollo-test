// @flow
import React, { type Node } from 'react';
import { Switch, Route } from 'react-router-dom';
import loadComponent from '../../utils/load-component';

const Home = loadComponent(import('../Home'));
const About = loadComponent(import('../About'));

const Routes = (): Node => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
  </Switch>
);

export default Routes;
