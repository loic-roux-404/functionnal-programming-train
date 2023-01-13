import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.170.0/testing/asserts.ts";
import { isPrime } from "./euler.ts";
import { isPrimeOf, universeZOfMul } from "./index.ts";

Deno.test("isNbFirstOf", () => {
  assertEquals(isPrimeOf(43, 26), true);
});

Deno.test("universeZOfMul Z6", () => {
  assertArrayIncludes(universeZOfMul(6), [
    [2, 4, 0, 2, 4],
    [3, 0, 3, 0, 3],
  ]);
});

Deno.test("universeZOfMul Z7", () => {
  assertArrayIncludes(universeZOfMul(7), [
    [2, 4, 6, 1, 3, 5],
    [3, 6, 2, 5, 1, 4],
  ]);
});

Deno.test("is prime number", () => {
  assertEquals(isPrime(2), true);
  assertEquals(isPrime(3), true);
  assertEquals(isPrime(7), true);
  assertEquals(isPrime(439), true);
});
