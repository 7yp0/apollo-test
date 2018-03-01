// @flow
import React, { type Node } from 'react';

import Loader from '../components/Loader';

export type Data = {
  loading: boolean,
  error?: Error,
};

type Props = {
  data?: Data,
};

const injectGqlLoader = (WrappedComponent: any): Node => (
  props: Props,
): Node => {
  const { data, ...rest } = props;

  const { loading, error } = data;

  if (loading || error) {
    return <Loader error={error} />;
  }

  return <WrappedComponent {...rest} {...data} />;
};

export default injectGqlLoader;
