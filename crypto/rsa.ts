import { isPrimeOf, isPrime, modularExponentiation, getPrimeFactors, extendedWithBachetBezoud } from "../math/index.ts"
import Logger from "../logger/index.ts"
import { getPhi } from "../math/euler.ts"

const createRsaSystem = (
  [p, q]: number[], e: number
): readonly [number, number] => {
  if (!isPrime(p) || !isPrime(q)) {
    throw new Error("p and q must be prime")
  }

  if (!isPrimeOf(e, p - 1) || !isPrimeOf(e, q - 1)) {
    throw new Error("e must be prime with p-1 and q-1")
  }

  if (!isPrimeOf(e, getPhi([p, q]))) {
    throw new Error("e must be prime with phi(n)")
  }

  return [p * q, e]
}

const encrypt = ([n, e]: number[], m: number) => {
    Logger.info(`n : ${n}, e : ${e}, m : ${m}`)
    
    // C = Me (n)
    return modularExponentiation(m, n, e)
}

const decrypt = (em: number, [n, e]: number[]) => {

    const [p, q] = getPrimeFactors(n)

    Logger.info(`1st div: ${p}, 2nd div: ${q}`)
    
    const phi = getPhi([p, q])
    Logger.info(`phi(n) : ${phi}`)
    
    const [_, d] = extendedWithBachetBezoud(e, phi)
    Logger.info(`d = ${d}`)

    // M = Cd (n)
    return modularExponentiation(em, n, d)
}

export { encrypt, decrypt, createRsaSystem }
