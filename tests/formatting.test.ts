import { describe, expect, it } from "vitest";
import { formatExchangeValue } from "@/lib/formatting";

describe("formatExchangeValue", () => {
  it("keeps meaningful decimals for tiny values", () => {
    expect(formatExchangeValue(0.00027)).toBe("0.00027");
    expect(formatExchangeValue(0.0124)).toBe("0.0124");
  });

  it("keeps standard readable formatting for larger values", () => {
    expect(formatExchangeValue(3500.45)).toBe("3,500.45");
    expect(formatExchangeValue(1.25)).toBe("1.25");
  });
});
