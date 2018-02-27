// @flow
import React, { type Node, Fragment } from 'react';
import {
  Route,
  Link as RouterLink,
  type Props as RouterProps,
} from 'react-router-dom';

type Props = RouterProps;

const About = ({ match }: Props): Node => (
  <Fragment>
    <div>About {match.url}</div>
    <RouterLink to={`${match.url}/nested`}>link</RouterLink>

    <Route
      exact
      path={`${match.url}`}
      render={(): Node => <div>about...</div>}
    />
    <Route
      path={`${match.url}/nested`}
      component={(): Node => <h3>nested!</h3>}
    />
  </Fragment>
);

export default About;
