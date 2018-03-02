// @flow
import React, { Component, type Node } from 'react';

import loadComponent from '../../utils/load-component';

const ErrorMessage = loadComponent((): any =>
  import('../../components/ErrorMessage'),
);

type State = {
  hasError: boolean,
};

type Props = {
  children: Node,
};

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
    // logErrorToMyService(error, info);
  }

  render(): Node {
    if (this.state.hasError) {
      return <ErrorMessage />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
