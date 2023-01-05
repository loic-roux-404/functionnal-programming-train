import { pgcd } from "./index.ts";

const isNbFirstOf = (nb: number, of: number): boolean => pgcd(nb, of) === 1

/**
 * print matrix with multiplication table in finihed universe
 * @param nb number to process
 */
const universeZOfMul = (x: number) =>
  Array.from({ length: x - 1 }, (_, i) =>
    Array.from({ length: x - 1 }, (_, j) => ((i + 1) * (j + 1)) % x)
  );

export { isNbFirstOf, universeZOfMul }
