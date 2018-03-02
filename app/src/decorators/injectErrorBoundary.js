// @flow
import React, { type Node } from 'react';

import loadComponent from '../utils/load-component';

const ErrorBoundary = loadComponent((): any =>
  import('../containers/ErrorBoundary'),
);

const injectErrorBoundary = (
  WrappedComponent: any,
): ((props: {}) => Node) => (props: {}): Node => (
  <ErrorBoundary>
    <WrappedComponent {...props} />
  </ErrorBoundary>
);

export default injectErrorBoundary;
