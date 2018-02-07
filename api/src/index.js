// @flow

const x: number = 4;

const y: (a?: number) => void = (a: number = x) => {
  console.log(a);
};

y();
