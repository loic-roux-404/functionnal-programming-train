// Lemme d'Euclide : soit un couple d'entiers naturels non nuls (a,b),
// si des entiers naturels q et r, avec r ≠ 0,
// sont tels que a = bq + r , alors : PGCD(a,b) = PGCD(b,r).
import Logger from "../logger/index.ts"

const pgcdWithDetail = (nb: number, andNb: number): [number, number[][]] => {
  const vec = [...[nb > andNb ? nb : andNb], ...[andNb < nb ? andNb : nb]];
  const steps = [[...vec]];

  while (vec[1] !== 0) {
    const r = vec[0] % vec[1];
    vec[0] = vec[1];
    vec[1] = r;
    steps.push([...vec]);
  }

  return [vec[0], steps];
};

const pgcd = (nb: number, andNb: number): number =>
  pgcdWithDetail(nb, andNb)[0];

const ppcmFormulae = (pgcd: number, a: number, b: number) => (a * b) / pgcd;

const ppcm = (nb: number, andNb: number): number =>
  ppcmFormulae(pgcd(nb, andNb), nb, andNb);

const refactoriseByCount = (arr: number[][]) =>
  arr
    .sort(([_, x2], [__, y2]) => (x2 > y2 ? -1 : 1))
    .map((item, pos, arr) => {
      if (arr[pos - 1] == null) return item;

      const previous = arr[pos - 1][1] ?? null;

      if (previous === item[1]) {
        arr[pos - 1][0] += item[0];
        return null;
      }

      return item;
    })
    .filter((item) => item != null) as number[][];

const extendedStep = ([v, a, u]: number[], [m1, q1, m2, q2]: number[]) => {
  const exp0 = [v, a];
  const exp1 = [u * m1, q1];
  const exp2 = [u * m2, q2];

  return refactoriseByCount([exp0, exp1, exp2]).flat();
};

// a u + b v = a ^ b
const extendedWithBachetBezoud = (a: number, b: number): [number, number] => {
  const [p, details] = pgcdWithDetail(a, b);
  const equationDownSide = details
    .filter(([_, b]) => b !== 0)
    .map(([a, b]) => [a, Math.floor(a / b), b, a % b])
    .filter(([_, __, ___, r]) => r !== 0);

  Logger.info(`a = ${a}, b = ${b}, p = ${p}`);

  const equationUpSide = equationDownSide
    .map(([a, u, b, _]) => [1, a, -u, b])
    .reverse();

  let i = 0;
  let res = equationUpSide[0];

  while (!(res.includes(a) && res.includes(b))) {
    Logger.info(res, equationUpSide[i + 1]);
    res = extendedStep(res, equationUpSide[i + 1]);

    i++;
  }

  Logger.info(res);

  const [u, _, v, __] = res;

  return [u, v];
};

const bezoudId = (pgcd: number, [a, u, b, v]: number[]) => {
  const inverseA = a / pgcd;
  const inverseB = b / pgcd;

  if (inverseA * u + inverseB * v !== 1) {
    throw new Error("Bezoud identity is not respected");
  }

  return [inverseA, u, inverseB, v];
};

const invZ = (z: number, invOf: number) => 
  invOf > 0 ? invOf : invOf + z

const bezoudIdInverse = ([a, u, b, v]: number[]) => [invZ(a, v), invZ(b, u)];

// My1 ≡ 1 (m)
const bruteForceInv = (mod: number, M: number) => {
  const res = Array.from({ length: mod }, (_, k) => k + 1)
    .findLast((y) => (y * M) % mod === 1);

  if (res == null) throw new Error("No inverse found");

  return res;
}

/*
p∧q=1

a ∈ N
b ∈ N

⌈x ≡ a (p)
⌊x ≡ b (q)

Possède une unique solution dans Zpq
*/
const chineseRemainder = (
  a: number,
  p: number,
  b: number,
  q: number
): number[] => {
  const [u, v] = extendedWithBachetBezoud(p, q);
  const mod = p * q;

  const shift = (invZ(mod, a) * u * q + invZ(mod, b) * v * p) % mod;

  return [invZ(mod, shift), mod];
}

// x ≡ a1 M1 y1 + a2 M2 y2 + ... + an+1 Mn+1 yn+1
const chineseRemainderMulti = (systems: { a: number; m: number }[]) => {
  const mod = systems.reduce((acc, { m }) => acc * m, 1);
  const shift =
    systems
      .map(({ a, m }) => [invZ(m, a), m, mod / m])
      .map(([a, m, M]) => [a, m, M, bruteForceInv(m, M)])
      .map(([a, _, M, y]) => a * M * y)
      .reduce((prev, curr) => prev + curr) % mod;

  return [invZ(mod, shift), mod];
}

export {
  pgcd,
  ppcm,
  invZ,
  extendedWithBachetBezoud,
  bezoudId,
  bezoudIdInverse,
  chineseRemainder,
  chineseRemainderMulti,
  bruteForceInv,
}
