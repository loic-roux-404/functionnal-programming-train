// Lemme d'Euclide : soit un couple d'entiers naturels non nuls (a,b),
// si des entiers naturels q et r, avec r ≠ 0, 
// sont tels que a = bq + r , alors : PGCD(a,b) = PGCD(b,r).

const pgcd = (nb: number, andNb: number): number => {
    const vec = [
      ...[nb > andNb ? nb : andNb], 
      ...[andNb < nb ? andNb : nb]
    ]

    while (vec[1] !== 0) {
        const r = vec[0] % vec[1]
        vec[0] = vec[1]
        vec[1] = r
        console.log(vec)
    }

    return vec[0]
  }

const ppcmFormulae = (pgcd: number, a: number, b: number) => a * b / pgcd;

const ppcm = (nb: number, andNb: number): number => ppcmFormulae(pgcd(nb, andNb), nb, andNb);

export { pgcd, ppcm }
