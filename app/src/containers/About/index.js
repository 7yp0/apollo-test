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
  createCat: (name: string) => Promise<Object>,
} & RouterProps;

type State = {
  catName: string,
};

const catsQuery = gql`
  query {
    cats {
      name
      _id
    }
  }
`;

const createCatMutation = gql`
  mutation createCat($name: String!) {
    createCat(name: $name) {
      name
      _id
    }
  }
`;

const mapCreateCatMutationToProps = {
  props: ({ mutate }: Object): Object => ({
    createCat: (name: string): Promise<Object> =>
      mutate({
        variables: { name },
        // * in case we know the response already
        optimisticResponse: {
          createCat: {
            name,
            _id: Math.round(Math.random() * -1000000),
            __typename: 'Cat',
          },
        },
        update: (store: Object, { data: { createCat } }: Object) => {
          // Read the data from the cache for this query.
          const data = store.readQuery({ query: catsQuery });
          // Add our channel from the mutation to the end.
          data.cats.push(createCat);
          // Write the data back to the cache.
          store.writeQuery({ query: catsQuery, data });
        },
      }),
  }),
};

@graphql(catsQuery)
// * NOTE: for multiple mutations use the compose function from react-apollo
@graphql(createCatMutation, mapCreateCatMutationToProps)
@injectGqlLoader
@injectErrorBoundary
class About extends Component<Props, State> {
  state = {
    catName: '',
  };

  handleInputChange = ({ target }: Object) => {
    this.setState({
      catName: target.value,
    });
  };

  handleClick = () => {
    this.props.createCat(this.state.catName);

    this.setState({
      catName: '',
    });
  };

  render(): Node {
    const { match, cats } = this.props;

    return (
      <Fragment>
        <div>About {match.url}</div>
        <div>
          <input value={this.state.catName} onChange={this.handleInputChange} />
          <button onClick={this.handleClick}>add cat</button>
        </div>
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
              {cats.map((cat: Cat): Node => (
                <li
                  key={cat._id}
                  style={{ color: Number(cat._id) < 0 ? 'red' : 'black' }}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          )}
        />
      </Fragment>
    );
  }
}

export default About;
