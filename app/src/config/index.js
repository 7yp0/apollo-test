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
  env: String(process.env.NODE_ENV),
  port: Number(process.env.PORT),
  isDevelopment: String(process.env.NODE_ENV) === 'development',
  isProduction: String(process.env.NODE_ENV) === 'production',
  isTest: String(process.env.NODE_ENV) === 'test',
  test: String(process.env.TEST),
};

export default config;
