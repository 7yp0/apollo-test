export const runsInServer = (() =>
  !(typeof window !== 'undefined' && window.document))();
