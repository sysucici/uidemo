gsap.registerPlugin(ScrollTrigger);

function initHeroEntrance(containerSelector, itemSelector) {
  gsap.from(itemSelector || `${containerSelector} > *`, {
    y: 32,
    opacity: 0,
    filter: "blur(6px)",
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.12,
    clearProps: "filter",
  });
}

function initLineReveal(headingSelector) {
  const headings = document.querySelectorAll(headingSelector);
  headings.forEach((heading) => {
    const lines = heading.querySelectorAll(".line-inner");
    gsap.from(lines, {
      y: "110%",
      duration: 0.85,
      ease: "expo.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: heading,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });
}

function initParallax(layers) {
  layers.forEach(({ selector, speed }) => {
    gsap.to(selector, {
      y: () => window.innerHeight * (speed - 1) * -0.4,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: speed,
      },
    });
  });
}

function initShowcaseReveal() {
  gsap.utils.toArray(".js-showcase-item").forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => el.classList.add("is-visible"),
      onLeaveBack: () => el.classList.remove("is-visible"),
    });
  });
}

function initTestimonialGlow() {
  const grid = document.getElementById("testimonial-grid");
  if (!grid) return;
  grid.addEventListener("mousemove", (e) => {
    const card = e.target.closest(".testimonial-card");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
}

function initSideRailProgress() {
  const progress = document.querySelector(".side-progress span");
  if (!progress) return;
  gsap.to(progress, {
    scaleY: 1,
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
    transformOrigin: "top",
  });
}

function initSideNavActive() {
  const links = Array.from(document.querySelectorAll(".side-nav [data-section]"));
  if (!links.length) return;
  const sections = links
    .map((link) => document.getElementById(link.dataset.section))
    .filter(Boolean);

  sections.forEach((section, i) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => setActive(i),
      onEnterBack: () => setActive(i),
    });
  });

  function setActive(idx) {
    links.forEach((link, i) => link.classList.toggle("active", i === idx));
  }
}

function initMobileProgress() {
  const progress = document.querySelector(".side-progress span");
  if (!progress) return;
  if (window.matchMedia("(max-width: 900px)").matches) {
    gsap.to(progress, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
      transformOrigin: "left",
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initHeroEntrance(".hero-c__inner", ".hero-c__inner > *");
  initLineReveal(".line-reveal");
  initParallax([
    { selector: ".hero-c__visual", speed: 0.9 },
    { selector: ".hero-c__glow", speed: 0.6 },
  ]);
  initShowcaseReveal();
  initTestimonialGlow();
  initSideRailProgress();
  initSideNavActive();
  initMobileProgress();

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  } else {
    ScrollTrigger.refresh();
  }
});
