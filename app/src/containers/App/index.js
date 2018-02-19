import React from 'react';
import { Switch, Route, Link as RouterLink } from 'react-router-dom';

import Home from '../Home';
import About from '../About';

const App = () => (
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
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </main>
  </div>
);

export default App;
