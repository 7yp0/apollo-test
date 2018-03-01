// @flow
import React, { Component, type Node } from 'react';

import ErrorMessage from '../../components/ErrorMessage';

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
