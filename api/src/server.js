// @flow

import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';

import initModels from './models';
// $FlowFixMe - index.graphql is buildded dynamically
import typeDefs from '../build/index.graphql';
import resolvers from './resolvers';

const PORT = 3000;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/example');

initModels();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const context = mongoose.models;

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT);
