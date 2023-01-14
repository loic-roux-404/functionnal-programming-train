import Logger from '../logger/index.ts'
import { isPrime } from '../math/numbers.ts'

const getPhi = ([p, q]: number[]): number => (p - 1) * (q - 1)

// ∀n ∈ N*, 𝜑(n) le nombre d'élements de Zn*. 
// C'est donc le nombre d'élements inversibles de Zn*.
const countInversible = (phi: number): number => {
  if (isPrime(phi)) return phi - 1

  const primeFactors = Array
    .from(
      { length: phi - 2 }, 
      (_, i) => isPrime(i + 2) && phi % (i + 2) === 0
         ? i + 2
         : null
    )
    .filter((n) => n !== null) as number[]

  Logger.info(`euler indicator prime factors : ${primeFactors.join(", ")}`)

  return primeFactors
    .reduce((prev, curr) => 
      prev * (curr - 1) / curr, phi
    )
}
export { isPrime, countInversible, getPhi }
