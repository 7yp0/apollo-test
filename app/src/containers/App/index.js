// @flow
import React, { Component, type Node, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import Routes from '../Routes';

type Props = {
  routes?: Object,
};

const mapStateToProps = (state: Object): Object => ({
  routes: state.routes,
});

@connect(mapStateToProps)
class App extends Component<Props> {
  render(): Node {
    const { routes } = this.props;
    if (!routes) {
      return null;
    }

    const { home, about } = routes;

    return (
      <Fragment>
        <header>
          <div>
            <RouterLink to={`/${home}`}>Home</RouterLink>
          </div>
          <div>
            <RouterLink to={`/${about}`}>to about</RouterLink>
          </div>
        </header>
        <main>
          <Routes />
        </main>
      </Fragment>
    );
  }
}

export default App;
