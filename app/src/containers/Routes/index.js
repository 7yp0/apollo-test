// @flow
import React, { Component, type Node } from 'react';
import { Switch, Route } from 'react-router-dom';
import loadComponent from '../../utils/load-component';

const Home = loadComponent((): any => import('../Home'));
const About = loadComponent((): any => import('../About'));

class Routes extends Component<Props> {
  render(): Node {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    );
  }
}

export default Routes;
