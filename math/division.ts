import { assert, assertArrayIncludes } from "https://deno.land/std@0.170.0/testing/asserts.ts"

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

const test7 = (_: number): boolean => {
  assert(false)
}

const test8 = (a: number): boolean => true

const test9 = (a: number): boolean => true

const test10 = (a: number): boolean => true

const test11 = (a: number): boolean => true

const test12 = (a: number): boolean => true

const fnMapping: {[k: number]: (a: number) => boolean} = {
  1: test1,
  2: test2,
  3: test3,
  4: test4,
  5: test5,
  6: test6,
  7: test7,
  8: test8,
  9: test9,
  10: test10,
  11: test11,
  12: test12,
}

const isDivisibleBy = (nb: number, by: number): boolean => {
  assertArrayIncludes(Object.keys(fnMapping), String(by))

  return fnMapping[by](nb)
}

export {
  isDivisibleBy
};
