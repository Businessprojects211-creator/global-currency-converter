import { describe, expect, it } from "vitest";
import { calculateConversion, validateConversion } from "@/lib/conversion";

describe("currency conversion", () => {
  it("calculates a converted amount", () => expect(calculateConversion(100, 3757.812227)).toBeCloseTo(375781.2227));
  it("accepts valid currency inputs", () => expect(validateConversion(100, "USD", "UGX")).toBe(true));
  it("rejects invalid amounts and currency codes", () => {
    expect(validateConversion(-1, "USD", "UGX")).toBe(false);
    expect(validateConversion(100, "US", "UGX")).toBe(false);
  });
});
