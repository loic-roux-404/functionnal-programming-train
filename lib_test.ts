// url_test.ts
import { assertEquals } from "https://deno.land/std@0.159.0/testing/asserts.ts";
import { capitalizeFirst } from "./lib.ts"

Deno.test("capitalize first test", () => {
  assertEquals(capitalizeFirst("aaaa"), "Aaaa");
  assertEquals(capitalizeFirst("Aaaa"), "Aaaa");
});

