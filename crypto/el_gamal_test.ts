import { assertEquals } from "https://deno.land/std@0.170.0/testing/asserts.ts";
import { decode, encode } from "./el_gamal.ts";

Deno.test("El gamal", () => {
  const system = [53, 2, 30]
  assertEquals(encode(system, 3, 42), [8, 12]);
  assertEquals(decode([8, 12], system, 13), 42)
})