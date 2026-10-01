import { useEffect, useMemo, useState } from "react";
import { A11y, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { slides } from "./data/slides.js";
import {
  SWIPER_BREAKPOINTS,
  formatPosition,
  getViewportPolicy,
  readSlideId,
  writeSlideId
} from "./lib/carouselPolicy.js";

function syncUrlToSlide(id) {
  const search = writeSlideId(window.location.search, id, slides);
  const next = `${window.location.pathname}${search}${window.location.hash}`;
  window.history.replaceState(null, "", next);
}

function StudyCard({ slide }) {
  return (
    <article className="study-card">
      <div className="study-visual">
        <img src={slide.image} alt={slide.alt} loading={slide.sequence === "01" ? "eager" : "lazy"} />
        <span className="study-sequence" aria-hidden="true">{slide.sequence}</span>
      </div>
      <div className="study-copy">
        <div className="study-meta">
          <span>{slide.tone}</span>
          <span>{slide.focus}</span>
        </div>
        <h2>{slide.title}</h2>
        <p>{slide.description}</p>
      </div>
    </article>
  );
}

export default function App() {
  const initialSlideId = useMemo(() => readSlideId(window.location.search, slides), []);
  const initialIndex = Math.max(0, slides.findIndex((slide) => slide.id === initialSlideId));

  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [edges, setEdges] = useState({ isBeginning: initialIndex === 0, isEnd: false });
  const [progress, setProgress] = useState(0);
  const [viewportPolicy, setViewportPolicy] = useState(() => getViewportPolicy(window.innerWidth));

  useEffect(() => {
    const onResize = () => setViewportPolicy(getViewportPolicy(window.innerWidth));
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function syncSwiperState(instance) {
    const index = Math.max(0, Math.min(instance.activeIndex, slides.length - 1));
    setActiveIndex(index);
    setEdges({ isBeginning: instance.isBeginning, isEnd: instance.isEnd });
    setProgress(instance.progress);
    syncUrlToSlide(slides[index].id);
  }

  function handleSwiper(instance) {
    setSwiper(instance);
    instance.slideTo(initialIndex, 0);
    syncSwiperState(instance);
  }

  const progressPercent = Math.round(progress * 100);

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="layout header-inner">
          <a className="brand" href="#main-content" aria-label="ORBIT carousel lab home">
            <span className="brand-mark" aria-hidden="true">O</span>
            <span>ORBIT</span>
          </a>
          <p>Responsive carousel interaction lab</p>
        </div>
      </header>

      <main id="main-content" className="layout">
        <section className="intro" aria-labelledby="page-title">
          <p className="eyebrow">React · Swiper · interaction policy</p>
          <h1 id="page-title">A carousel that exposes its state instead of hiding it.</h1>
          <p className="intro-copy">
            ORBIT turns a basic product slider exercise into a focused interaction system:
            responsive density, keyboard navigation, accessible pagination, explicit edge states,
            and a shareable active-slide URL.
          </p>
        </section>

        <section className="lab-panel" aria-labelledby="lab-title">
          <div className="lab-toolbar">
            <div>
              <p className="eyebrow">Live system</p>
              <h2 id="lab-title">Colorway studies</h2>
            </div>

            <div className="lab-status" aria-label="Carousel status">
              <div>
                <span className="status-label">Position</span>
                <strong aria-live="polite">{formatPosition(activeIndex, slides.length)}</strong>
              </div>
              <div>
                <span className="status-label">Viewport</span>
                <strong>{viewportPolicy.label}</strong>
              </div>
              <div>
                <span className="status-label">Density</span>
                <strong>{viewportPolicy.slidesPerView}</strong>
              </div>
            </div>

            <div className="nav-controls" aria-label="Carousel navigation">
              <button
                type="button"
                onClick={() => swiper?.slidePrev()}
                disabled={!swiper || edges.isBeginning}
                aria-label="Show previous study"
              >
                <span aria-hidden="true">←</span>
                <span>Previous</span>
              </button>
              <button
                type="button"
                onClick={() => swiper?.slideNext()}
                disabled={!swiper || edges.isEnd}
                aria-label="Show next study"
              >
                <span>Next</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          <div
            className="progress-track"
            role="progressbar"
            aria-label="Carousel progress"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={progressPercent}
          >
            <span style={{ width: `${progressPercent}%` }} />
          </div>

          <Swiper
            className="orbit-swiper"
            modules={[A11y, Keyboard, Pagination]}
            initialSlide={initialIndex}
            slidesPerView={1.08}
            spaceBetween={14}
            breakpoints={SWIPER_BREAKPOINTS}
            keyboard={{ enabled: true, onlyInViewport: true }}
            pagination={{ clickable: true }}
            a11y={{
              enabled: true,
              containerMessage: "ORBIT colorway studies carousel",
              prevSlideMessage: "Previous study",
              nextSlideMessage: "Next study",
              paginationBulletMessage: "Go to study {{index}}"
            }}
            watchSlidesProgress
            onSwiper={handleSwiper}
            onSlideChange={syncSwiperState}
            onProgress={(instance) => setProgress(instance.progress)}
            onReachBeginning={(instance) => syncSwiperState(instance)}
            onReachEnd={(instance) => syncSwiperState(instance)}
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <StudyCard slide={slide} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="lab-notes">
            <p><strong>Keyboard:</strong> focus the carousel and use the arrow keys.</p>
            <p><strong>URL state:</strong> the current slide is reflected in <code>?slide=…</code>.</p>
            <p><strong>Scope:</strong> visual studies only—no fake cart, checkout, or backend behavior.</p>
          </div>
        </section>

        <section className="policy-grid" aria-labelledby="policy-title">
          <div>
            <p className="eyebrow">Engineering notes</p>
            <h2 id="policy-title">Responsive behavior is a policy, not scattered magic numbers.</h2>
          </div>
          <div className="policy-cards">
            <article>
              <span>01</span>
              <h3>Density</h3>
              <p>Viewport tiers define card exposure and spacing from one shared policy.</p>
            </article>
            <article>
              <span>02</span>
              <h3>State</h3>
              <p>Active position, edge availability, progress, and URL state stay synchronized.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Access</h3>
              <p>Real buttons, keyboard support, focus styles, labels, and Swiper A11y replace clickable icons.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="layout site-footer">
        <span>ORBIT</span>
        <span>Carousel interaction lab · static frontend demo</span>
      </footer>
    </div>
  );
}
