// @flow
import { combineReducers } from 'redux';

export type Store = {
  test: Object,
};

export default combineReducers({
  test: (): Object => ({}),
});
