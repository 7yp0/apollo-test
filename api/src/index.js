// @flow

import express from 'express';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';

import typeDefs from './schemas';
import resolvers from './resolvers';

const PORT = 3000;
const app = express();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

mongoose.connect('mongodb://127.0.0.1:27017/example');

const Cat = mongoose.model('Cat', { name: String });

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema, context: { Cat } }),
);

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT);
