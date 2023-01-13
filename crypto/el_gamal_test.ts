import { assertEquals } from "https://deno.land/std@0.170.0/testing/asserts.ts";
import { decrypt, encrypt } from "./el_gamal.ts";

Deno.test(`El gamal for p, g, h : [53, 2, 30],
 k = 3, s = 13 and m = 42`, () => {
  const system = [53, 2, 30]
  assertEquals(encrypt(system, 3, 42), [8, 12]);
  assertEquals(decrypt([8, 12], system, 13), 42)
})
