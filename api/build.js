// @flow
import glob from 'glob';
import fs from 'fs';

require.extensions['.graphql'] = (module: Object, filename: string) => {
  // eslint-disable-next-line no-param-reassign
  module.exports = fs.readFileSync(filename, 'utf8');
};

const asyncGlob = async (
  filePath: string,
  options: Object,
): Promise<Array<string>> =>
  new Promise((resolve: () => void, reject: (error: Error) => void) => {
    glob(filePath, options, (error: Error, files: Array<string>) => {
      if (error) {
        reject(error);
      }

      resolve(files);
    });
  });

const loadSchemasAsync = async (): Array<string> => {
  const schemas = [];

  const files = await asyncGlob('**/schema.graphql', {});
  const filteredFiles = files.filter(
    (file: string): boolean => !file.includes('node_modules'),
  );

  filteredFiles.forEach((file: string) => {
    const relativeFile = `./${file}`;
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const schema = require(relativeFile);

    schemas.push(schema);
  });

  return schemas;
};

const buildSchemaFile = async (): void => {
  const schemas = await loadSchemasAsync();
  const schemaString = schemas.join('');

  fs.writeFile(
    `${__dirname}/build/index.graphql`,
    schemaString,
    (error: Error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.error(error);

        return;
      }

      // eslint-disable-next-line no-console
      console.log('file was created');
    },
  );
};

buildSchemaFile();
