// @flow
import React, { type Node } from 'react';
import ErrorBoundary from '../containers/ErrorBoundary';

const injectErrorBoundary = (
  WrappedComponent: any,
): Node => (props: {}): Node => (
  <ErrorBoundary>
    <WrappedComponent {...props} />
  </ErrorBoundary>
);

export default injectErrorBoundary;
