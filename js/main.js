/* =============================================================
   Oniya Portfolio — Animation orchestration v4
   "Zero WebGL. Zero jank. CSS-only hero backdrop."

   Three.js has been entirely removed. The hero scene is now a
   CSS gradient halo + an animated SVG ring system. Costs ~0 GPU.

   Animations remaining: loader, Lenis smooth scroll, custom
   cursor (desktop only), hero text reveal via opacity + small Y,
   scroll-triggered fade-ups for sections.

   No more particle fields, no per-frame buffer mutations,
   no GSAP property tweens against geometry. Page should feel
   instant.
   ============================================================= */

/* -----------------------------------------------------------
   Capability detection — gate all heavy effects on this
   ----------------------------------------------------------- */
const deviceSupports = {
  pointer: !window.matchMedia("(pointer: coarse)").matches,
  bigViewport: window.innerWidth >= 900,
  reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
};
const heavyEffectsOK = deviceSupports.pointer && deviceSupports.bigViewport && !deviceSupports.reducedMotion;

/* -----------------------------------------------------------
   STATE
   ----------------------------------------------------------- */
const state = { mx: window.innerWidth / 2, my: window.innerHeight / 2 };

window.addEventListener("mousemove", (e) => {
  state.mx = e.clientX; state.my = e.clientY;
}, { passive: true });

/* -----------------------------------------------------------
   LOADER
   ----------------------------------------------------------- */
function runLoader() {
  return new Promise((resolve) => {
    const counterEl = document.getElementById("loaderCount");
    const loaderEl = document.getElementById("loader");
    const captionEl = loaderEl?.querySelector(".loader__caption");
    if (!counterEl || !loaderEl) { resolve(); return; }

    const phrases = ["LOADING", "PREPARING", "READY"];
    let phraseIdx = 0;
    let v = 0;

    const tick = () => {
      v += 3 + Math.floor(Math.random() * 4);
      if (v >= 100) v = 100;
      counterEl.textContent = String(v).padStart(3, "0");
      const idx = Math.min(phrases.length - 1, Math.floor(v / 34));
      if (idx !== phraseIdx && captionEl) {
        phraseIdx = idx;
        captionEl.textContent = phrases[idx];
      }
      if (v < 100) {
        setTimeout(tick, 10 + Math.random() * 14);
      } else {
        setTimeout(() => {
          loaderEl.classList.add("is-done");
          setTimeout(resolve, 700);
        }, 180);
      }
    };
    tick();
  });
}

/* -----------------------------------------------------------
   LENIS — smooth scroll
   ----------------------------------------------------------- */
function initLenis() {
  if (deviceSupports.reducedMotion) return null;
  if (!window.Lenis) return null;
  const lenis = new window.Lenis({
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,
  });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  if (window.gsap && window.ScrollTrigger) {
    lenis.on("scroll", window.ScrollTrigger.update);
    window.gsap.ticker.add((t) => lenis.raf(t * 1000));
    window.gsap.ticker.lagSmoothing(0);
  }

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      lenis.scrollTo(t, { offset: -40, duration: 1.1 });
    });
  });
  return lenis;
}

/* -----------------------------------------------------------
   CURSOR — only on big pointer-fine devices
   ----------------------------------------------------------- */
function initCursor() {
  if (!deviceSupports.pointer) {
    document.querySelectorAll(".cursor, .cursor-dot, .cursor-blob").forEach((el) => {
      el.style.display = "none";
    });
    document.body.style.cursor = "auto";
    return;
  }

  const ring = document.getElementById("cursor");
  const dot = document.getElementById("cursorDot");
  const blob = document.getElementById("cursorBlob");
  if (!ring || !dot) return;

  if (!deviceSupports.bigViewport && blob) blob.style.display = "none";

  const s = { rx: state.mx, ry: state.my, dx: state.mx, dy: state.my, bx: state.mx, by: state.my };

  const render = () => {
    s.rx += (state.mx - s.rx) * 0.18;
    s.ry += (state.my - s.ry) * 0.18;
    s.dx += (state.mx - s.dx) * 0.6;
    s.dy += (state.my - s.dy) * 0.6;
    ring.style.transform = `translate3d(${s.rx}px, ${s.ry}px, 0) translate(-50%, -50%)`;
    dot.style.transform = `translate3d(${s.dx}px, ${s.dy}px, 0) translate(-50%, -50%)`;
    if (blob && blob.style.display !== "none") {
      s.bx += (state.mx - s.bx) * 0.08;
      s.by += (state.my - s.by) * 0.08;
      blob.style.transform = `translate3d(${s.bx}px, ${s.by}px, 0) translate(-50%, -50%)`;
    }
    requestAnimationFrame(render);
  };
  render();

  const hoverables = "a, button, .btn, .channel, .proj__stack li, .stack__col li, .nav__cta, [data-hover]";
  document.querySelectorAll(hoverables).forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("is-hover"));
    el.addEventListener("mouseleave", () => ring.classList.remove("is-hover"));
  });
}

/* -----------------------------------------------------------
   HERO TITLE REVEAL — letter by letter (opacity + small Y, no mask)
   ----------------------------------------------------------- */
function splitElementText(el) {
  if (!el || el.dataset.split === "1") return [];
  const text = el.textContent;
  const out = [];
  el.textContent = "";
  for (const ch of text) {
    if (ch === " ") {
      el.appendChild(document.createTextNode(" "));
      continue;
    }
    const inner = document.createElement("span");
    inner.className = "splitChar";
    inner.textContent = ch;
    el.appendChild(inner);
    out.push(inner);
  }
  el.dataset.split = "1";
  return out;
}

function revealHero() {
  if (!window.gsap) return;
  const gsap = window.gsap;

  const leafSelector = ".hero__title .line > span, .hero__title .line > em, .hero__title .line > .hero__num";
  const allChars = [];
  document.querySelectorAll(leafSelector).forEach((leaf) => {
    splitElementText(leaf).forEach((c) => allChars.push(c));
  });

  if (allChars.length) {
    gsap.set(allChars, { opacity: 0, y: 20 });
    gsap.to(allChars, {
      opacity: 1, y: 0,
      duration: 0.8,
      ease: "expo.out",
      stagger: 0.02,
      delay: 0.05,
    });
  }

  const fades = [".hero__eyebrow", ".hero__sub", ".hero__cta", ".hero__meta"];
  fades.forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.55 + i * 0.1, ease: "expo.out" }
    );
  });
}

/* -----------------------------------------------------------
   SCROLL REVEALS — section heads + bodies + project cards
   ----------------------------------------------------------- */
function initScrollReveals() {
  if (!window.gsap || !window.ScrollTrigger) return;
  const gsap = window.gsap;
  const ST = window.ScrollTrigger;
  gsap.registerPlugin(ST);

  const heads = [
    ".approach__title", ".work__heading", ".about__title",
    ".stack__heading", ".contact__heading",
  ];
  heads.forEach((sel) => {
    const el = document.querySelector(sel);
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 82%" } }
    );
  });

  const bodies = document.querySelectorAll(
    ".approach__body p, .work__lede, .contact__lede, .stack__col, .about__copy p, .about__pact, .creds__inner"
  );
  bodies.forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%" } }
    );
  });

  document.querySelectorAll(".proj").forEach((proj) => {
    const body = proj.querySelector(".proj__body");
    const visual = proj.querySelector(".proj__visual");
    if (body) {
      gsap.fromTo(body,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: "expo.out",
          scrollTrigger: { trigger: proj, start: "top 80%" } }
      );
    }
    if (visual) {
      gsap.fromTo(visual,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.9, ease: "expo.out", delay: 0.05,
          scrollTrigger: { trigger: proj, start: "top 80%" } }
      );
    }
  });

  const portrait = document.querySelector(".about__portrait");
  if (portrait) {
    gsap.fromTo(portrait,
      { opacity: 0, scale: 0.95, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 1.0, ease: "expo.out",
        scrollTrigger: { trigger: ".about", start: "top 75%" } }
    );
  }

  const stickyCta = document.querySelector(".sticky-cta");
  if (stickyCta) {
    gsap.set(stickyCta, { autoAlpha: 0, y: 24 });
    ST.create({
      trigger: ".hero",
      start: "bottom 80%",
      onEnter: () => gsap.to(stickyCta, { autoAlpha: 1, y: 0, duration: 0.5, ease: "expo.out" }),
      onLeaveBack: () => gsap.to(stickyCta, { autoAlpha: 0, y: 24, duration: 0.3 }),
    });
    ST.create({
      trigger: ".contact",
      start: "top 80%",
      onEnter: () => gsap.to(stickyCta, { autoAlpha: 0, duration: 0.3 }),
      onLeaveBack: () => gsap.to(stickyCta, { autoAlpha: 1, duration: 0.3 }),
    });
  }
}

/* -----------------------------------------------------------
   3D card tilt — only on big pointer devices, very subtle
   ----------------------------------------------------------- */
function initCardTilt() {
  if (!heavyEffectsOK) return;
  document.querySelectorAll(".proj__visual").forEach((card) => {
    const max = 4;
    let raf = null;
    card.style.transformStyle = "preserve-3d";
    card.style.transition = "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)";
    const move = (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (py - 0.5) * -max;
      const ry = (px - 0.5) * max;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        card.style.setProperty("--gx", `${px * 100}%`);
        card.style.setProperty("--gy", `${py * 100}%`);
      });
    };
    const reset = () => {
      if (raf) cancelAnimationFrame(raf);
      card.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
      card.style.setProperty("--gx", "50%");
      card.style.setProperty("--gy", "50%");
    };
    card.addEventListener("mousemove", move);
    card.addEventListener("mouseleave", reset);
  });
}

/* -----------------------------------------------------------
   NAV scroll state
   ----------------------------------------------------------- */
function initNav() {
  const nav = document.getElementById("nav");
  if (!nav) return;

  // Any section the nav should "go dark" over. The contact section is the
  // only dark area today; any future section just needs class .contact or
  // attribute data-theme="dark".
  const darkSections = document.querySelectorAll(
    '.contact, [data-theme="dark"]'
  );

  // Approximate nav height — used to decide whether nav is currently OVER a
  // dark section. We check if any dark section spans the top ~72px band.
  const navBand = 72;

  const updateTheme = () => {
    let inDark = false;
    darkSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= navBand && rect.bottom >= 0) inDark = true;
    });
    nav.classList.toggle("is-dark", inDark);
  };

  const updateScrolled = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  const onScroll = () => {
    updateScrolled();
    updateTheme();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateTheme, { passive: true });
  onScroll();
}

/* -----------------------------------------------------------
   Magnetic buttons
   ----------------------------------------------------------- */
function initMagnetic() {
  if (!heavyEffectsOK) return;
  document.querySelectorAll(".btn, .nav__cta").forEach((el) => {
    const strength = 0.2;
    let rafId = null;
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      });
    });
    el.addEventListener("mouseleave", () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.style.transition = "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)";
      el.style.transform = "translate3d(0, 0, 0)";
      setTimeout(() => { el.style.transition = ""; }, 400);
    });
  });
}

/* -----------------------------------------------------------
   AURORA BLOBS — desktop only, CSS-driven breathing
   ----------------------------------------------------------- */
function initAurora() {
  if (!heavyEffectsOK) return;
  const wrap = document.createElement("div");
  wrap.className = "aurora-wrap";
  wrap.setAttribute("aria-hidden", "true");
  const blobs = [
    { cls: "aurora aurora--1", color: "rgba(220, 38, 38, 0.18)", x: "75%", y: "10%", size: 600 },
    { cls: "aurora aurora--2", color: "rgba(245, 158, 11, 0.12)", x: "15%", y: "55%", size: 540 },
    { cls: "aurora aurora--3", color: "rgba(220, 38, 38, 0.1)", x: "82%", y: "82%", size: 460 },
  ];
  blobs.forEach((b) => {
    const el = document.createElement("div");
    el.className = b.cls;
    el.style.background = `radial-gradient(circle, ${b.color} 0%, transparent 65%)`;
    el.style.left = b.x;
    el.style.top = b.y;
    el.style.width = `${b.size}px`;
    el.style.height = `${b.size}px`;
    wrap.appendChild(el);
  });
  document.body.appendChild(wrap);
}

/* -----------------------------------------------------------
   BOOT
   ----------------------------------------------------------- */
async function boot() {
  await new Promise((r) => requestAnimationFrame(r));

  initAurora();
  initCursor();
  initNav();
  initMagnetic();
  initCardTilt();
  initLenis();

  await runLoader();
  revealHero();
  setTimeout(initScrollReveals, 100);
}

if (document.readyState === "complete" || document.readyState === "interactive") {
  boot();
} else {
  window.addEventListener("DOMContentLoaded", boot);
}
