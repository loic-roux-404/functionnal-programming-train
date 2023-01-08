import { assertEquals } from "https://deno.land/std@0.170.0/testing/asserts.ts";
import {
  extendedWithBachetBezoud,
  bezoudId,
  bezoudIdInverse,
  chineseRemainder,
  chineseRemainderMulti,
} from "./euclide.ts";
import { pgcd, ppcm } from "./index.ts";

Deno.test("pgcd", () => {
  assertEquals(pgcd(1800, 1296), 72);
});

Deno.test("ppcm", () => {
  assertEquals(ppcm(54, 12), 108);
});

Deno.test("bachet", () => {
  assertEquals(extendedWithBachetBezoud(1800, 1296), [-5, 7]);
  assertEquals(extendedWithBachetBezoud(1740, 23), [-3, 227]);
});

Deno.test("bezoud identity", () => {
  assertEquals(bezoudId(72, [1800, -5, 1296, 7]), [25, -5, 18, 7]);
});

Deno.test("bezoud identity inverse of", () => {
  assertEquals(bezoudIdInverse([25, -5, 18, 7]), [7, 13]);
  assertEquals(bezoudIdInverse([43, -3, 26, 5]), [5, 23]);
});

Deno.test("Chinese remainder (caviste)", () => {
  assertEquals(chineseRemainder(4, 5, 2, 9), [29, 45]);
  assertEquals(chineseRemainderMulti([
    { a: 4, m: 5 },
    { a: 3, m: 6 },
    { a: 10, m: 13 }
  ]), [309, 390]);
  assertEquals(chineseRemainderMulti([
    { a: -1, m: 3 },
    { a: -5, m: 7 },
    { a: -8, m: 17 }
  ]), [128, 357]);
});
