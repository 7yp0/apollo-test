// @flow
import React, { Component, type Node, Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Routes from '../Routes';

class App extends Component<Props> {
  render(): Node {
    return (
      <Fragment>
        <header>
          <div>
            <RouterLink to="/">Home</RouterLink>
          </div>
          <div>
            <RouterLink to="/about">to about</RouterLink>
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
