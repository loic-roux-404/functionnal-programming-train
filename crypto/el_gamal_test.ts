import { assertEquals } from "https://deno.land/std@0.170.0/testing/asserts.ts";
import { decrypt, encrypt } from "./el_gamal.ts";

Deno.test("El gamal", () => {
  const system = [53, 2, 30]
  assertEquals(encrypt(system, 3, 42), [8, 12]);
  assertEquals(decrypt([8, 12], system, 13), 42)
})