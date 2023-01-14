import { assertEquals } from "https://deno.land/std@0.170.0/testing/asserts.ts";
import { createRsaSystem, decrypt, encrypt } from "./rsa.ts";

Deno.test("Rsa system create", () => {
  assertEquals(createRsaSystem([47, 59], 17), [2773, 17])
})

Deno.test("Rsa system encrypt", () => {
  assertEquals(createRsaSystem([47, 59], 17), [2773, 17])
  assertEquals(encrypt([2773, 17], 66), 872);
})

Deno.test("Rsa system decrypt", () => {
  assertEquals(decrypt(872, [2773, 17]), 66);
})

// assertEquals(decrypt([8, 12], system, 13), 42)