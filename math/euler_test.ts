import { assertEquals } from "https://deno.land/std@0.170.0/testing/asserts.ts";
import { isPrime } from "./euler.ts";

Deno.test("is prime number", ()=> {
  assertEquals(isPrime(2), true)
  assertEquals(isPrime(3), true)
  assertEquals(isPrime(7), true)
  assertEquals(isPrime(439), true)
})