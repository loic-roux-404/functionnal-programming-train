import { modularExponentiation } from "../math/division.ts"
import Logger from "../logger/index.ts";
import { extendedWithBachetBezoud, invZ } from "../math/euclide.ts";

const encode = ([p, g, h]: number[], k: number, m:number ) => {
  const c1 = g ** k
  console.log(`c1 = ${c1}`)
  const c2 = (m * h ** k) % p

  return [c1, c2]
}

// c2    mh^k  mh^k
// --  = --- = ---  = m
// c1^s  g^ks h^k
// Donc
// m = c2 / c1^s
// et comme la diviion est impossible dans Zp :
// c2 * c1^(-s) = m
const decode = ([c1, c2]: number[], [p, g, h]: number[], s: number) => {
  if (s > p) throw new Error("Invalid key")
  
  const checkKey = g ** s % p

  if (checkKey !== h) throw new Error("Invalid key")
  
  console.log(`check : ${checkKey}`)
  const [div, q] = [c2, modularExponentiation(c1 ** s, p, s)]
  Logger.info(`mDiv : ${div} / ${q}`)
  
  const invDiv = extendedWithBachetBezoud(q, p)
  Logger.info(`gamal bezoud : ${invDiv.join(", ")}`)
  const inverse = invZ(p, invDiv[1])

  Logger.info(`inverse : ${inverse}`)

  return div * inverse % p
}

export { encode, decode }