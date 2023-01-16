import Logger from "../logger/index.ts";

const pairNbTest = (a: number, toValidateNbs: number[]): boolean => 
  toValidateNbs.includes(Number(String(a).charAt(String(a).length - 1)))

const test1 = (a: number) => Number(String(a).charAt(String(a).length - 1)) === 1

const test2 = (a: number): boolean =>
  pairNbTest(a, [0, 2, 4, 6, 8])

const test3 = (a: number): boolean => {
  let res = String(a)

  while (res.length !== 1)
    res = res.split("").reduce((a, b) => String(Number(a) + Number(b)))
  
  return Number(res) % 3 === 0
}

const test4 = (a: number): boolean => pairNbTest(a, [0, 4, 8])

const test5 = (a: number): boolean => pairNbTest(a, [5, 0])

const test6 = (a: number): boolean => test2(a) && test3(a)

const test8 = (a: number): boolean => (String(a).length >= 3 
    ? Number(String(a).slice(-3)) 
    : a
  ) % 8 === 0

const test9 = (a: number): boolean => {
  let res = String(a)

  while (res.length !== 1)
    res = res.split("").reduce((a, b) => String(Number(a) + Number(b)))
  
  return Number(res) % 9 === 0
}

const test10 = (a: number): boolean => Number(String(a).charAt(String(a).length - 1)) === 0

const test11 = (a: number): boolean => {

  if (String(a).length <= 3) return a % 11 === 0

  const odd = String(a).split("")
    .map(nb => Number(nb))
    .filter(nb => nb === 1 || nb % 2 === 1)
    .reduce((a, b) => a + b)

  const even = String(a).split("")
    .map(nb => Number(nb))
    .filter(nb => nb === 0 || nb % 2 === 0)
    .reduce((a, b) => a + b)

  return (even - odd) % 11 === 0
}

const fnMapping: { [k: string]: (a: number) => boolean } = Object.freeze({
  1: test1,
  2: test2,
  3: test3,
  4: test4,
  5: test5,
  6: test6,
  8: test8,
  9: test9,
  10: test10,
  11: test11
})

const isDivisibleBy = (nb: number, by: number): boolean => {
  if (Object.keys(fnMapping).filter((e: string) => Number(e) === by).length <= 0) {
    Logger.warning(`The number ${by} is not supported by optimised functions`)
    return nb % by === 0
  }

  const res = fnMapping[by](nb)

  Logger.info(`${nb} in Z${by} is ${res}`)

  return res
}

// a^k ≡ b^k (n)
const modularExponentiation = (b: number, m: number, e: number): number => {
  if (m === 1) return 0
  
  if (e < 0)
    return -1

  b = b % m
  let result = 1
  Logger.info(`${b}^${e}[${m}], gives: ${result}`)

  while (e > 0) {
    if (e % 2 === 1)
      result = (result * b) % m
    e = Math.floor(e / 2)
    b = (b * b) % m
    Logger.info(`${b}^${e}[${m}], gives: ${result}`)
  }

  return result
}

export {
  isDivisibleBy,
  modularExponentiation
};
