// @flow
import mongoose from 'mongoose';

import * as Cat from './cat';

type Model = {
  name: string,
  Model: Object,
};

const ModelList: Array<Model> = [Cat];

const initModels = () => {
  ModelList.forEach((model: Model) => {
    mongoose.model(model.name, model.Model);
  });
};

export default initModels;
