// @flow
import React, { type Node, Fragment, Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Route,
  Link as RouterLink,
  type Props as RouterProps,
} from 'react-router-dom';
import Loader from '../../components/Loader';

type Cat = {
  name: string,
  _id: string,
};

type Props = {
  data?: {
    cats: Array<Cat>,
    loading: boolean,
    error?: Error,
  },
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
class About extends Component<Props> {
  render(): Node {
    const { match, data } = this.props;
    const { cats, loading, error } = data;

    // TODO: make decorator
    if (loading || error) {
      return <Loader error={error} />;
    }

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
              {cats.map((cat: Cat): string => (
                <li key={cat._id}>{cat.name}</li>
              ))}
            </ul>
          )}
        />
      </Fragment>
    );
  }
}

export default About;
