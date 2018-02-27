// @flow
type Config = {
  env: string,
  port: number,
  isDevelopment: boolean,
  isProduction: boolean,
  isTest: boolean,
  test: string,
};

const config: Config = {
  env: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  test: process.env.TEST,
};

export default config;
