// @flow
import React, { type Node } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home';
import About from '../About';

const Routes = (): Node => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
  </Switch>
);

export default Routes;
