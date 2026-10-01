# ORBIT — Responsive Carousel Interaction Lab

ORBIT modernizes a 2023 React + Swiper carousel exercise into a focused interaction-engineering demo.

The original repository demonstrated Swiper navigation, fraction pagination, and breakpoints, but it also contained Create React App boilerplate, fake commerce links, placeholder product data, inaccessible clickable icons, invalid CSS, unused dependencies, and no meaningful tests or CI.

## Engineering focus

ORBIT treats carousel behavior as an explicit system instead of a styling trick:

- responsive card-density policy
- deterministic edge-state handling
- keyboard navigation
- accessible pagination
- real button semantics for previous/next controls
- shareable active-slide URL state
- pure policy functions that can be tested without rendering React
- static GitHub Pages deployment

## Architecture

```text
src/data/slides.js
        │
        ▼
src/lib/carouselPolicy.js
        ├─ viewport density policy
        ├─ index clamping
        ├─ previous / next bounds
        ├─ position formatting
        └─ URL read/write rules
        │
        ▼
src/App.jsx
        ├─ Swiper integration
        ├─ active slide synchronization
        ├─ edge-state controls
        ├─ progress state
        └─ viewport policy display
        │
        ▼
Swiper 14 + static frontend
```

## What changed

### Tooling

- Create React App → Vite
- React 18 → React 19
- Swiper 10 → Swiper 14
- removed Bootstrap
- removed React Bootstrap
- removed React Icons
- removed CRA testing boilerplate and Web Vitals

Dependencies are intentionally small and pinned exactly.

### Interaction

The carousel now exposes and synchronizes:

- active slide
- beginning/end state
- progress
- viewport density tier
- active slide URL state

The URL uses `?slide=<id>` and preserves unrelated query parameters.

### Accessibility

- semantic previous/next buttons
- disabled edge controls
- keyboard navigation
- Swiper A11y module
- labeled pagination
- skip navigation
- visible focus treatment
- reduced-motion handling
- descriptive image alt text

### Product scope

The old "Add to Card" and "Buy Now" links were removed.

ORBIT is an interaction lab, not an e-commerce application. It does not pretend to have cart, checkout, inventory, authentication, analytics, or a backend.

## Responsive policy

| Width | Tier | Slides per view |
| --- | --- | ---: |
| < 520px | mobile | 1.08 |
| ≥ 520px | compact | 1.45 |
| ≥ 760px | tablet | 2.15 |
| ≥ 1040px | desktop | 3 |
| ≥ 1280px | wide | 3.4 |

Partial neighboring slides are deliberate: they communicate horizontal continuation without requiring hidden affordances.

## Local development

Requirements:

- Node.js 22+
- npm

```bash
npm install --legacy-peer-deps --no-audit --no-fund
npm run dev
```

The `--legacy-peer-deps` flag avoids an npm 10 Arborist resolver crash observed on current GitHub-hosted Node 22 runners; it is a package-manager workaround, not an application runtime requirement.

## Tests

```bash
npm test
```

The Vitest suite covers:

- invalid viewport recovery
- breakpoint boundary selection
- negative index clamping
- upper-bound index clamping
- previous navigation at the first slide
- next navigation at the final slide
- one-based position formatting
- invalid URL slide recovery
- valid URL slide recovery
- query-parameter preservation
- canonical first-slide URLs

## Quality gate

```bash
npm run check
```

Runs syntax checks, all tests, and a Vite production build.

## CI

`.github/workflows/quality.yml` runs the quality gate on pull requests and pushes to `main`.

## Deployment

ORBIT is a static frontend and includes a manual GitHub Pages workflow.

1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Open **Actions → Deploy Pages**.
4. Run the workflow.

## Security review

No API keys, tokens, passwords, credentials, or server endpoints are required.

The project contains no user HTML injection, auth assumptions, payment behavior, or sensitive browser storage.

## Scope and limitations

ORBIT intentionally does not implement:

- looping
- autoplay
- remote content fetching
- commerce flows
- user accounts
- analytics
- server-side state

The engineering goal is predictable, inspectable carousel interaction—not feature volume.

## License

MIT. See [LICENSE](./LICENSE).
