import { describe, it, expect } from "vitest";
import { computeBooking, spaces } from "./spaces";
describe("service fee", () => {
  it("is 10% of rent", () => { expect(computeBooking(spaces[0]!, "month", 1).fee).toBe(3500); });
  it("has a 500 DZD minimum", () => { expect(computeBooking(spaces[2]!, "day", 1).fee).toBe(500); });
});
