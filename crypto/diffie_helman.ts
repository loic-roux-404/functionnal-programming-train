import { modularExponentiation } from "../math/division.ts";
import Logger from "../logger/index.ts";
/**
 * create priv (mod exponentiation), return pub
 */
const getKeyPair = (key: number, [p, g]: number[]): number => {
  const pub = Math.pow(g, key) % p
  Logger.info(`pub : ${pub}`);

  return pub;
};

const matchPrivKey = ([a, b]: number[], [p, g]: number[]): boolean => {
  const pubA = getKeyPair(a, [p, g]);
  const pubB = getKeyPair(b, [p, g]);

  const Ka = modularExponentiation(pubB, p, a)
  const Kb = modularExponentiation(pubA, p, b)

  Logger.info(`kA : ${pubA} / KB : ${pubB}`)

  return Ka === Kb
};

export { getKeyPair, matchPrivKey };