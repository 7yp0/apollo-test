// @flow
import React, { type Node } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import Loader from '../../components/Loader';

const LoadableHome = Loadable({
  loader: (): any => import('../Home'),
  loading: Loader,
});

const LoadableAbout = Loadable({
  loader: (): any => import('../About'),
  loading: Loader,
});

const Routes = (): Node => (
  <Switch>
    <Route exact path="/" component={LoadableHome} />
    <Route path="/about" component={LoadableAbout} />
  </Switch>
);

export default Routes;
