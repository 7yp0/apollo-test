// @flow
import React, { Component, type Node } from 'react';
import { withRouter } from 'react-router-dom';

import injectErrorBoundary from '../../decorators/injectErrorBoundary';

type Props = {
  history: {
    push: (route: string) => void,
  },
};

@withRouter
@injectErrorBoundary
class Home extends Component<Props> {
  handleChangePage = () => {
    const { history: { push } } = this.props;

    push('/about');
  };

  render(): Node {
    return (
      <div>
        <span>Home</span>
        <button onClick={this.handleChangePage}>To About page</button>
      </div>
    );
  }
}

export default Home;
