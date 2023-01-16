import { modularExponentiation } from "../math/division.ts"
import Logger from "../logger/index.ts";
import { extendedWithBachetBezoud, invZ } from "../math/euclide.ts";

/**
 * c1 = g^k
 * c2 = mh^k
 * @returns [c1, c2] the encrypted message
 */
const encrypt = ([p, g, h]: number[], k: number, m: number): readonly [number, number] => {
  const c1 = g ** k
  Logger.info(`c1 = ${c1}`)
  const c2 = (m * h ** k) % p
  Logger.info(`c2 = ${c2}`)

  return [c1, c2]
}

/** General formulae el gamal crypto system
* c2    mh^k  mh^k
* --  = --- = ---  = m
* c1^s  g^ks h^k
* Check key
* h = g^s (p)
* Donc
* m = c2 / c1^s
* and as diviion is impossible in Zp :
* c2 * c1^(-s) = m
*/
const decrypt = (
  [c1, c2]: number[], 
  [p, g, h]: number[],
  s: number
) => {
  if (s > p) throw new Error("Invalid key")
  const checkH = g ** s % p

  Logger.info(`check : ${checkH}`)
  if (checkH !== h) throw new Error("Invalid key")
  
  const [div, q] = [c2, modularExponentiation(c1 ** s, p, s)]
  Logger.info(`mDiv : ${div} / ${q}`)
  
  const invDiv = extendedWithBachetBezoud(q, p)
  Logger.info(`gamal bezoud : ${invDiv.join(", ")}`)
  const inverse = invZ(p, invDiv[1])

  Logger.info(`inverse : ${inverse}`)

  return div * inverse % p
}

export { encrypt, decrypt }
