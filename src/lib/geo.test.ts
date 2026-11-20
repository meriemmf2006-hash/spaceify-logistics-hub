import { describe, it, expect } from "vitest";
import { distanceKm, nearestWilaya, wilayaCoords } from "./geo";
describe("geo", () => {
  it("Algiers to Oran is about 360 km", () => {
    const d = distanceKm(wilayaCoords["الجزائر العاصمة"]!, wilayaCoords["وهران"]!);
    expect(d).toBeGreaterThan(340); expect(d).toBeLessThan(380);
  });
  it("finds nearest wilaya", () => { expect(nearestWilaya({ lat: 36.5, lng: 2.9 })).toBe("البليدة"); });
});
