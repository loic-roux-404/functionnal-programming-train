import { assertEquals } from "https://deno.land/std@0.170.0/testing/asserts.ts"
import { bachetBezoud } from "./euclide.ts";
import { pgcd, ppcm } from "./index.ts"

Deno.test("pgcd", () => {
  assertEquals(pgcd(1800, 1296), 72);
})

Deno.test("ppcm", () => {
  assertEquals(ppcm(54, 12), 108);
})

Deno.test("bachet bezoud", () => {
  assertEquals(bachetBezoud(1800, 1296), [5, -7])
})
