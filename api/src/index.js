// @flow

const x = (a: number): number => a * 2;

const y = (b: number): number => b ** 2;

const z: number = 2 |> x |> y;

console.log(z);
