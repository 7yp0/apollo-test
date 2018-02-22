// @flow
import React, { type Node } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Routes from '../Routes';

const App = (): Node => (
  <div>
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
  </div>
);

export default App;
