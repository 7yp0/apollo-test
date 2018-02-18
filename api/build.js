// @flow
import glob from 'glob';
import fs from 'fs';

// $FlowFixMe - extensions is defined
require.extensions['.graphql'] = (module: Object, filename: string) => {
  // eslint-disable-next-line no-param-reassign
  module.exports = fs.readFileSync(filename, 'utf8');
};

const asyncGlob = (
  filePath: string,
  options: Object,
): Promise<Array<string> | void> =>
  new Promise((resolve: () => void, reject: (error: Error) => void) => {
    glob(filePath, options, (error: Error, files: Array<string>) => {
      if (error) {
        reject(error);
      }

      // $FlowFixMe - resolve takes an argument
      resolve(files);
    });
  });

const loadSchemas = async (): Promise<Array<string>> => {
  const files = await asyncGlob('src/**/*.graphql', {});

  if (!files) {
    throw new Error('no graphql files found');
  }

  const filteredFiles = files.filter(
    (file: string): boolean => !file.includes('node_modules'),
  );

  return filteredFiles.map((file: string): string => {
    const relativeFile = `./${file}`;
    // eslint-disable-next-line global-require, import/no-dynamic-require
    return require(relativeFile);
  });
};

const buildSchemaFile = async (): Promise<void> => {
  const schemas = await loadSchemas();
  const schemaString = schemas.join('');

  fs.writeFile(
    `${__dirname}/build/index.graphql`,
    schemaString,
    // $FlowFixMe - function is fine
    (error: Error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.error(error);

        return;
      }

      // eslint-disable-next-line no-console
      console.log('schema file was created');
    },
  );
};

buildSchemaFile();
