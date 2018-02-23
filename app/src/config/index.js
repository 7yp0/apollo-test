export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  test: process.env.TEST,
};
