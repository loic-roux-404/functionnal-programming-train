import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.170.0/testing/asserts.ts";
import { isNbFirstOf, universeZOfMul } from "./index.ts";

Deno.test("isNbFirstOf", () => {
  assertEquals(isNbFirstOf(43, 26), true);
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
