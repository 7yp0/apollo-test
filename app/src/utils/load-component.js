// @flow
import Loadable from 'react-loadable';

import Loader from '../components/Loader';

const loadComponent = (loader: any): any =>
  Loadable({
    loader,
    loading: Loader,
    delay: 300,
  });

export default loadComponent;
