export const VIEWPORT_POLICIES = Object.freeze([
  { minWidth: 1280, slidesPerView: 3.4, spaceBetween: 20, label: "wide" },
  { minWidth: 1040, slidesPerView: 3, spaceBetween: 20, label: "desktop" },
  { minWidth: 760, slidesPerView: 2.15, spaceBetween: 18, label: "tablet" },
  { minWidth: 520, slidesPerView: 1.45, spaceBetween: 16, label: "compact" },
  { minWidth: 0, slidesPerView: 1.08, spaceBetween: 14, label: "mobile" }
]);

export const SWIPER_BREAKPOINTS = Object.freeze({
  520: { slidesPerView: 1.45, spaceBetween: 16 },
  760: { slidesPerView: 2.15, spaceBetween: 18 },
  1040: { slidesPerView: 3, spaceBetween: 20 },
  1280: { slidesPerView: 3.4, spaceBetween: 20 }
});

export function getViewportPolicy(width) {
  const safeWidth = Number.isFinite(Number(width)) ? Math.max(0, Number(width)) : 0;
  return VIEWPORT_POLICIES.find((policy) => safeWidth >= policy.minWidth)
    ?? VIEWPORT_POLICIES[VIEWPORT_POLICIES.length - 1];
}

export function clampSlideIndex(index, total) {
  const safeTotal = Math.max(0, Number(total) || 0);
  if (safeTotal === 0) return 0;
  const safeIndex = Number.isFinite(Number(index)) ? Math.trunc(Number(index)) : 0;
  return Math.min(Math.max(safeIndex, 0), safeTotal - 1);
}

export function previousSlideIndex(index, total) {
  return clampSlideIndex(clampSlideIndex(index, total) - 1, total);
}

export function nextSlideIndex(index, total) {
  return clampSlideIndex(clampSlideIndex(index, total) + 1, total);
}

export function formatPosition(index, total) {
  const safeTotal = Math.max(0, Number(total) || 0);
  if (safeTotal === 0) return "0 / 0";
  return `${clampSlideIndex(index, safeTotal) + 1} / ${safeTotal}`;
}

export function readSlideId(search, slides) {
  if (!Array.isArray(slides) || slides.length === 0) return null;
  const params = new URLSearchParams(search || "");
  const candidate = params.get("slide");
  return slides.some((slide) => slide.id === candidate) ? candidate : slides[0].id;
}

export function writeSlideId(search, id, slides) {
  const params = new URLSearchParams(search || "");
  const ids = Array.isArray(slides) ? slides.map((slide) => slide.id) : [];
  if (!ids.includes(id) || id === ids[0]) params.delete("slide");
  else params.set("slide", id);
  const next = params.toString();
  return next ? `?${next}` : "";
}
