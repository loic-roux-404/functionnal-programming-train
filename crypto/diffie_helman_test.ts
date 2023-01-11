import { assertEquals } from "https://deno.land/std@0.170.0/testing/asserts.ts"
import { getKeyPair, matchPrivKey } from "./diffie_helman.ts"

Deno.test("Diffie helman : p = 23 / g = 3", () => {
  assertEquals(getKeyPair(15, [23, 3]), 12);
  assertEquals(getKeyPair(6, [23, 3]), 16);
})
Deno.test("Diffie helman : p = 23 / g = 3", () => {
  assertEquals(matchPrivKey([15, 6], [23, 3]), true);
})