import { assertEquals } from "https://deno.land/std@0.170.0/testing/asserts.ts";
import { createRsaSystem, decrypt, encrypt } from "./rsa.ts";

Deno.test("Rsa system create", () => {
  assertEquals(createRsaSystem([47, 59], 17), [2773, 17])
})

Deno.test("Rsa system encrypt", () => {
  assertEquals(createRsaSystem([47, 59], 17), [2773, 17])
  assertEquals(encrypt([2773, 17], 66), 872);

  assertEquals(createRsaSystem([67, 139], 5465), [9313, 5465])
  assertEquals(decrypt(4166, [9313, 5465]), 1200);
  assertEquals(decrypt(5094, [9313, 7807]), 1200);
})

Deno.test("Rsa system decrypt", () => {
  assertEquals(decrypt(872, [2773, 17]), 66);
})
