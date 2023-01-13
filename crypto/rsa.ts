import { isPrimeOf, isPrime, modularExponentiation } from "../math/index.ts"
import Logger from "../logger/index.ts"

const createRsaSystem = ([p, q]: number[], e: number) => {
  if (!isPrime(p) || !isPrime(q)) {
    throw new Error("p and q must be prime")
  }

  if (!isPrimeOf(e, p - 1) || !isPrimeOf(e, q - 1)) {
    throw new Error("e must be prime with p-1 and q-1")
  }

  const phi = (p - 1) * (q - 1)

  if (!isPrimeOf(e, phi)) {
    throw new Error("e must be prime with phi(n)")
  }

  return [p * q, e]
}

const encryptV1 = ([n, e]: number[], m: number) => {
    Logger.info(`n : ${n}, e : ${e}, m : ${m}`)
    
    // C = Me (n)
    return modularExponentiation(m, n, e, 2)
}

const decrypt = () => {}

export { encryptV1, decrypt, createRsaSystem }
