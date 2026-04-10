/// <reference lib="deno.ns" />
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

Deno.test("sanity check", () => {
  assertEquals(1 + 1, 2);
});
