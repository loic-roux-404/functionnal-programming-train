import { pgcd } from "./index.ts";

const isPrime = (n: number): boolean => {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  const limit = Math.sqrt(n);

  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) return false;
  }

  return true;
}

const isPrimeOf = (nb: number, of: number): boolean => pgcd(nb, of) === 1

/**
 * print matrix with multiplication table in finihed universe
 * @param nb number to process
 */
const universeZOfMul = (x: number) =>
  Array.from({ length: x - 1 }, (_, i) =>
    Array.from({ length: x - 1 }, (_, j) => ((i + 1) * (j + 1)) % x)
  );

export { isPrimeOf, universeZOfMul, isPrime }
