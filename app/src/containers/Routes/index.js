// @flow
import React, { Component, type Node } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import loadComponent from '../../utils/load-component';

const Home = loadComponent((): any => import('../Home'));
const About = loadComponent((): any => import('../About'));

type Props = {
  routes?: Object,
};

const mapStateToProps = (state: Object): Object => ({
  routes: state.routes,
});

@connect(mapStateToProps)
class Routes extends Component<Props> {
  render(): Node {
    const { routes } = this.props;

    if (!routes) {
      return null;
    }

    const { home, about } = routes;

    return (
      <Switch>
        <Route exact path={`/${home}`} component={Home} />
        <Route path={`/${about}`} component={About} />
      </Switch>
    );
  }
}

export default Routes;
