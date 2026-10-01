import { describe, expect, it } from "vitest";
import {
  clampSlideIndex,
  formatPosition,
  getViewportPolicy,
  nextSlideIndex,
  previousSlideIndex,
  readSlideId,
  writeSlideId
} from "./carouselPolicy.js";

const slides = [
  { id: "noir" },
  { id: "moss" },
  { id: "signal" }
];

describe("carousel policy", () => {
  it("uses the mobile policy for invalid widths", () => {
    expect(getViewportPolicy("bad").label).toBe("mobile");
  });

  it("selects responsive density at policy boundaries", () => {
    expect(getViewportPolicy(519).label).toBe("mobile");
    expect(getViewportPolicy(520).label).toBe("compact");
    expect(getViewportPolicy(1040).label).toBe("desktop");
    expect(getViewportPolicy(1280).label).toBe("wide");
  });

  it("clamps negative slide indexes", () => {
    expect(clampSlideIndex(-3, 3)).toBe(0);
  });

  it("clamps slide indexes above the collection", () => {
    expect(clampSlideIndex(9, 3)).toBe(2);
  });

  it("stops previous navigation at the first slide", () => {
    expect(previousSlideIndex(0, 3)).toBe(0);
  });

  it("stops next navigation at the final slide", () => {
    expect(nextSlideIndex(2, 3)).toBe(2);
  });

  it("formats a one-based position label", () => {
    expect(formatPosition(1, 3)).toBe("2 / 3");
  });

  it("recovers an unknown slide id to the first slide", () => {
    expect(readSlideId("?slide=missing", slides)).toBe("noir");
  });

  it("reads a known slide id from URL state", () => {
    expect(readSlideId("?slide=signal", slides)).toBe("signal");
  });

  it("preserves unrelated query parameters when writing slide state", () => {
    expect(writeSlideId("?ref=portfolio", "moss", slides)).toBe("?ref=portfolio&slide=moss");
  });

  it("keeps the first slide as the canonical URL", () => {
    expect(writeSlideId("?ref=portfolio&slide=signal", "noir", slides)).toBe("?ref=portfolio");
  });
});
