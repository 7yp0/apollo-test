// @flow
import Loadable from 'react-loadable';

import Loader from '../components/Loader';

const loadComponent = (importer: any): any =>
  Loadable({
    loader: (): any => importer,
    loading: Loader,
    delay: 300,
  });

export default loadComponent;
