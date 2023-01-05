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

const refactoriseByCount = (arr: number[][]) => arr
    .sort(([_, x2], [__, y2]) => (x2 > y2 ? -1 : 1))
    .map((item, pos, arr) => {
      if (arr[pos - 1] == null) return item

      const previous = arr[pos - 1][1] ?? null
      
      if (previous === item[1]) {
        arr[pos - 1][0] += item[0]
        return null
      }

      return item
    })
    .filter(item => item != null) as number[][]

const bachetStep = ([v, a, u]: number[], [m1, q1, m2, q2]: number[]) => {
  const exp0 = [v, a];
  const exp1 = [u * m1, q1];
  const exp2 = [u * m2, q2];

  return refactoriseByCount([exp0, exp1, exp2]).flat();
}

// a u + b v = a ^ b
const bachet = (a: number, b: number): [number, number] => {
  const [p, details] = pgcdWithDetail(a, b);
  const additionSide = details
    .filter(([_, b]) => b !== 0)
    .map(([a, b]) => [a, Math.floor(a / b), b, a % b])
    .filter(([_, __, ___, r]) => r !== 0)

  console.info(`a = ${a}, b = ${b}, p = ${p}`)
  
  const soustractionSide = additionSide
    .map(([a, u, b, _]) => [1, a, -u, b])
    .reverse();

  let i = 0
  let res = soustractionSide[0];

  while (!(res.includes(a) && res.includes(b))) {
    console.info(res, soustractionSide[i + 1])
    res = bachetStep(res, soustractionSide[i + 1])

    i++;
  }

  console.info(res)
  
  const [u, _, v, __] = res;

  return [u, v];
}

export { pgcd, ppcm, bachet };
