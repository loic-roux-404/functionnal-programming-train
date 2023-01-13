import { assertEquals } from "https://deno.land/std@0.170.0/testing/asserts.ts";
import { countInversible } from "./euler.ts";

Deno.test("Indicatrice d'euler", () => {
  assertEquals(countInversible(126), 36)
  assertEquals(countInversible(1200), 320)
});
