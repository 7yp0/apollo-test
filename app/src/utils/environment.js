export const runsInServer = (() =>
  !(typeof window !== 'undefined' && window.document))();

export const isTest = (() =>
  process && process.env && process.env.NODE_ENV === 'test')();

export const isDevelopment = (() =>
  process && process.env && process.env.NODE_ENV === 'development')();

export const isProduction = (() =>
  process && process.env && process.env.NODE_ENV === 'production')();
