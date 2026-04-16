/// <reference lib="deno.ns" />
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { AuthStorage } from "./auth.store.ts";

Deno.test("AuthStorage - sanity", () => {
  assertEquals(1, 1);
});
