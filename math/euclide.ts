// Lemme d'Euclide : soit un couple d'entiers naturels non nuls (a,b),
// si des entiers naturels q et r, avec r ≠ 0,
// sont tels que a = bq + r , alors : PGCD(a,b) = PGCD(b,r).

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

// a u + b v = a ^ b
const bachetBezoud = (a: number, b: number): [number, number] => {
  const [_, details] = pgcdWithDetail(a, b);
  const additionSide = details
    .filter(([_, b]) => b !== 0)
    .map(([a, b]) => [a, Math.floor(a / b), b, a % b]);

  const soustractionSide = additionSide
    .filter(([_, __, ___, r]) => r !== 0)
    .map(([a, q, d, r]) => [r, a, q, d])
    .reverse();

  console.log(additionSide, soustractionSide);

  const result = soustractionSide
    .map(([_, a, q, __], index) => {
      const next = soustractionSide[index + 1] ?? []
      if (next.length === 0) return []

      return [[a, q], [next[1], next[2], next[3]]];
    })
    .filter(arr => arr.length > 0)

  console.log(result);

  return [0, 0];
};

export { pgcd, ppcm, bachetBezoud };
