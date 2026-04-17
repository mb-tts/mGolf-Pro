/// <reference lib="deno.ns" />
// @ts-ignore: Deno URL import
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { calculateNetScore, formatVgaCode, calculateRanks } from "./golf-math.ts";

Deno.test("Golf Math - calculateNetScore", () => {
  // Test trường hợp thông thường
  assertEquals(calculateNetScore(80, 10), 70);
  // Test trường hợp HDC 0
  assertEquals(calculateNetScore(72, 0), 72);
  // Test trường hợp điểm âm (nếu có)
  assertEquals(calculateNetScore(68, 5), 63);
});

Deno.test("Golf Math - formatVgaCode", () => {
  // Test mã thiếu số
  assertEquals(formatVgaCode("123"), "00123");
  // Test mã đủ số
  assertEquals(formatVgaCode("99999"), "99999");
  // Test mã trống
  assertEquals(formatVgaCode(""), "");
});

Deno.test("Golf Math - calculateRanks", () => {
  const scores = [72, 68, 75, 68, 80];
  const expectedRanks = [2, 1, 3, 1, 4]; // 68 là hạng 1, 72 là hạng 2,...
  
  assertEquals(calculateRanks(scores), expectedRanks);
});
