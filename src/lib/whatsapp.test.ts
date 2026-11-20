import { describe, it, expect } from "vitest";
import { toWaNumber, PLATFORM_WHATSAPP } from "./whatsapp";
describe("whatsapp", () => {
  it("platform number is 0667219255", () => { expect(PLATFORM_WHATSAPP).toBe("213667219255"); });
  it("converts local 0 prefix to 213", () => { expect(toWaNumber("0555 12 34 56")).toBe("213555123456"); });
});
