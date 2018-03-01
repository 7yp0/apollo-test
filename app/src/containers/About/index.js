// @flow
import React, { type Node, Fragment, Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Route,
  Link as RouterLink,
  type Props as RouterProps,
} from 'react-router-dom';

import injectGqlLoader from '../../decorators/injectGqlLoader';
import injectErrorBoundary from '../../decorators/injectErrorBoundary';

type Cat = {
  name: string,
  _id: string,
};

type Props = {
  cats: Array<Cat>,
} & RouterProps;

const mapQueryToProps = gql`
  query {
    cats {
      name
      _id
    }
  }
`;

@graphql(mapQueryToProps)
@injectGqlLoader
@injectErrorBoundary
class About extends Component<Props> {
  render(): Node {
    const { match, cats } = this.props;

    return (
      <Fragment>
        <div>About {match.url}</div>
        <RouterLink to={`${match.url}/cats`}>show Cats</RouterLink>

        <Route
          exact
          path={`${match.url}`}
          render={(): Node => <div>about...</div>}
        />
        <Route
          path={`${match.url}/cats`}
          component={(): Node => (
            <ul>
              {cats.map((cat: Cat): Node => <li key={cat._id}>{cat.name}</li>)}
            </ul>
          )}
        />
      </Fragment>
    );
  }
}

export default About;
